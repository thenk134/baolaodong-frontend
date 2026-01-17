import express from 'express';
import RSSParser from 'rss-parser';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';

const app = express();
app.use(cors());

const parser = new RSSParser();

//Cấu hình cache
//thời gian tồn tại dữ liệu trước khi hủy stdTTL-300s
//checkperiod: 60s
const myCache = new NodeCache({stdTTL:300, checkperiod:60})

// LẤY TIN TRANG CHỦ TỪ BÁO TUỔI TRẺ (Thay cho Lao Động bị lỗi)
app.get('/api/news/home-laodong', async (req, res) => {
  try {

    const CACHE_KEY = 'home_news'; // thêm nhãn cho gói tin Home
    //1. kiểm tra xem còn lưu cache cũ không, nếu không thì load mới
    const cachedData = myCache.get(CACHE_KEY);
    if(cachedData) {
      console.log('Lấy từ cache');
      return res.json(cachedData);
    }
    //2.load mới dữ liệu
    // Giữ nguyên tên Route /home-laodong để không phải sửa Frontend
    const RSS_URL = 'https://tuoitre.vn/rss/tin-moi-nhat.rss';
    
    const response = await axios.get(RSS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const feed = await parser.parseString(response.data);
    const articles = feed.items.map(item => {
      // Tách ảnh từ description của Tuổi Trẻ
      const match = (item.content || item.description || "").match(/src="([^">]+)"/);
      return {
        id: item.guid || item.link,
        title: item.title,
        description: item.contentSnippet || "Nhấp để xem chi tiết...",
        link: item.link,
        date: item.pubDate,
        image: match ? match[1] : "https://via.placeholder.com/400x250"
      };
    });
    //3. Lưu vào cache giúp người dùng sau load nhanh hơn
    myCache.set(CACHE_KEY,articles);

    res.json(articles);
  } catch (error) {
    console.error("LỖI TUỔI TRẺ:", error);
    res.status(500).json({message: ' Lỗi server'});
  }
});

// API CHUYÊN MỤC
app.get('/api/news/:source/:category', async (req, res) => {
  try {
    const { source, category } = req.params;
    let RSS_URL = "";
    // Tạo key cache duy nhất cho từng chuyên mục
    // Ví dụ: category_tuoitre_the-thao
    const CACHE_KEY = `category_${source}_${category}`;

    //1. Kiểm tra cache
    const cachedData = myCache.get(CACHE_KEY);

    if(cachedData) {
      console.log(`[Category: ${category}] Lấy từ cache`);
      return  res.json(cachedData);
    }

    //2. Không có trong cache thì tải mới
    
    if (source === 'tuoitre') {
      // Link: https://tuoitre.vn/rss/thoi-su.rss
      RSS_URL = `https://tuoitre.vn/rss/${category}.rss`;
    } else if (source === 'nld') {
      // Link: https://nld.com.vn/thoi-su.rss (Không có /rss/)
      RSS_URL = `https://nld.com.vn/${category}.rss`;
    } else {
      // Mặc định VnExpress
      RSS_URL = `https://vnexpress.net/rss/${category}.rss`;
    }

    console.log("🔥 Đang lấy tin từ:", RSS_URL);

    const response = await axios.get(RSS_URL);
    const feed = await parser.parseString(response.data);
    
    // Logic map dữ liệu... (giữ nguyên phần map của bạn)
    const articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      image: item.enclosure?.url || "https://via.placeholder.com/400x250",
      description: item.contentSnippet
    }));

    //3. Lưu cache để tăng tốc load cho người sau

    myCache.set(CACHE_KEY, articles)
    res.json(articles);

  } catch (error) {
    console.error("Lỗi Server:", error.message);
    res.json([]);

  }
  
});
// API CHI TIẾT (Đã thêm bộ bóc tách cho Tuổi Trẻ)
app.get('/api/news-detail', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu URL" });

    //Tạo Key cache là chính đường link bài viết
    const CACHE_KEY = `detail_${url}`;
    //1. Kieem tra cache
    const cachedContent = myCache.get(CACHE_KEY);
    if(cachedContent) {
      return res.json(cachedContent);
    }
    //2. Load content mới
    const response = await axios.get(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Xóa bỏ các thành phần rác để không lấy nhầm nội dung quảng cáo/bình luận
    $('script, style, iframe, .box-comment, .box-ads, .relative-news, footer, header, nav').remove();

    let title = $('h1').first().text().trim();
    
    // Thử lấy Sapo (Mô tả) từ nhiều class phổ biến
    let description = $('.sapo, .description, .article-sapo, .sapo-detail, .article_sapo, h2').first().text().trim();

    let content = "";
    
    // Danh sách các vùng chứa nội dung chính (Cập nhật mới nhất cho 2026)
    const contentSelectors = [
      'article.fck_detail',     // VnExpress
      '.article-content',       // Lao Động
      '#main-detail-body',      // Tuổi Trẻ
      '.content-news-detail',   // Người Lao Động
      '.cms-body',              // Thanh Niên
      '.post-content',          // Chung
      '[itemprop="articleBody"]' // Chuẩn SEO chung
    ];

    let mainContainer = null;
    for (const selector of contentSelectors) {
      if ($(selector).length > 0) {
        mainContainer = $(selector);
        break;
      }
    }

    // Nếu không tìm thấy vùng chứa cụ thể, dùng thẻ article hoặc body làm vùng chứa đại trà
    if (!mainContainer || mainContainer.length === 0) {
      mainContainer = $('article').length > 0 ? $('article') : $('body');
    }

    // Duyệt qua các thẻ p và img bên trong vùng chứa đã tìm thấy
    mainContainer.find('p, img').each((i, el) => {
      if (el.name === 'p') {
        const pText = $(el).text().trim();
        // Chỉ lấy những đoạn văn có độ dài hợp lý để tránh lấy rác (menu, tag)
        if (pText.length > 20) {
          content += `<p class="mb-5 text-gray-800 leading-relaxed text-lg">${$(el).html()}</p>`;
        }
      } else if (el.name === 'img') {
        // Lấy src từ nhiều thuộc tính khác nhau (hỗ trợ lazy load)
        let src = $(el).attr('data-src') || $(el).attr('src') || $(el).attr('data-original');
        if (src && !src.startsWith('data:')) {
          if (src.startsWith('//')) src = 'https:' + src;
          content += `<div class="my-6 text-center"><img src="${src}" class="w-full rounded-lg shadow-md mx-auto" alt="content image" /></div>`;
        }
      }
    });

    const result = { title, description, content };
    myCache.set(CACHE_KEY, result);
    res.json(result);
  } catch (error) {
    console.error("LỖI BÓC TÁCH:", error.message);
    res.json({ title: "Lỗi tải bài viết", description: "", content: "Không thể lấy nội dung từ nguồn này." });
  }
});
app.listen(5000, () => console.log('Server đã đổi sang nguồn Tuổi Trẻ - Port 5000'));