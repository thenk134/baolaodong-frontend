import express from 'express';
import RSSParser from 'rss-parser';
import cors from 'cors';
import axios from 'axios'; // Thêm axios

const app = express();
const parser = new RSSParser();

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const RSS_URL = 'https://vnexpress.net/rss/tin-moi-nhat.rss';
    // const RSS_URL = 'https://laodong.vn/rss/home.rss';
    
    // Sử dụng axios để lấy dữ liệu thô với Header giả lập trình duyệt
    const response = await axios.get(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    });

    // Ép kiểu parser đọc từ chuỗi dữ liệu vừa tải về
    const feed = await parser.parseString(response.data);
    
    const articles = feed.items.map(item => {
      const content = item.content || item.description || "";
      const imgRegex = /<img[^>]+src="([^">]+)"/;
      const match = content.match(imgRegex);
      
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
    console.error("Lỗi Server:", error.message);
    res.status(500).json({ error: "Không thể nhận diện định dạng RSS từ Lao Động" });
  }
});

app.listen(5000, () => console.log('Backend đang chạy tại http://localhost:5000'));