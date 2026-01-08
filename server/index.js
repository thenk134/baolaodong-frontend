import express from 'express';
import RSSParser from 'rss-parser';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());

const parser = new RSSParser();

// LẤY TIN TRANG CHỦ TỪ BÁO TUỔI TRẺ (Thay cho Lao Động bị lỗi)
app.get('/api/news/home-laodong', async (req, res) => {
  try {
    // Chúng ta giữ nguyên tên Route /home-laodong để bạn không phải sửa Frontend
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

    res.json(articles);
  } catch (error) {
    console.error("LỖI TUỔI TRẺ:", error.message);
    res.json([]);
  }
});

// API CHUYÊN MỤC
app.get('/api/news/:source/:category', async (req, res) => {
  try {
    const { source, category } = req.params;
    let url = '';
    
    if (source === 'tuoitre') {
      url = `https://tuoitre.vn/rss/${category}.rss`;
    } else if (source === 'nld') {
      url = `https://nld.com.vn/${category}.rss`;
    } else {
      url = `https://vnexpress.net/rss/${category}.rss`;
    }

    const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const feed = await parser.parseString(response.data);
    
    const articles = feed.items.map(item => {
      const match = (item.content || item.description || "").match(/src="([^">]+)"/);
      return {
        id: item.link,
        title: item.title,
        description: item.contentSnippet,
        link: item.link,
        date: item.pubDate,
        image: match ? match[1] : "https://via.placeholder.com/400x250"
      };
    });
    res.json(articles);
  } catch (error) {
    res.json([]);
  }
});

// API CHI TIẾT (Đã thêm bộ bóc tách cho Tuổi Trẻ)
app.get('/api/news-detail', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(response.data);
    let title = '', description = '', content = '', selector = '';

    if (url.includes('tuoitre.vn')) {
      title = $('.article-title').text().trim();
      description = $('.sapo').text().trim();
      selector = '#main-detail-body'; // Selector nội dung của Tuổi Trẻ
    } else if (url.includes('nld.com.vn')) {
      title = $('.title-content').text();
      description = $('.sapo-detail').text();
      selector = '.content-news-detail';
    } else {
      title = $('h1.title-detail').text();
      description = $('p.description').text();
      selector = 'article.fck_detail';
    }

    $(selector).find('p, img').each((i, el) => {
      if (el.name === 'p') {
        content += `<p class="mb-4 text-lg text-gray-800">${$(el).html()}</p>`;
      } else if (el.name === 'img') {
        let src = $(el).attr('data-src') || $(el).attr('src');
        if (src) {
          if (src.startsWith('//')) src = 'https:' + src;
          content += `<img src="${src}" class="w-full rounded my-4" />`;
        }
      }
    });
    res.json({ title, description, content });
  } catch (error) {
    res.status(500).json({ error: "Lỗi nội dung" });
  }
});

app.listen(5000, () => console.log('Server đã đổi sang nguồn Tuổi Trẻ - Port 5000'));