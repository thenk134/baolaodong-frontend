import express from 'express';
import RSSParser from 'rss-parser';
import cors from 'cors';

const app = express();
const parser = new RSSParser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
  },
  timeout: 10000, // Đợi tối đa 10 giây
});

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    // Thử dùng link RSS tin mới nhất của Lao Động
    const RSS_URL = 'https://laodong.vn/rss/home.rss';
    console.log("Đang lấy tin từ:", RSS_URL);
    
    const feed = await parser.parseURL(RSS_URL);
    
    const articles = feed.items.map(item => ({
      id: item.guid || item.link,
      title: item.title,
      description: item.contentSnippet || "",
      link: item.link,
      date: item.pubDate,
      image: "https://via.placeholder.com/400x250" // Tạm thời để ảnh mặc định
    }));

    res.json(articles);
  } catch (error) {
    console.error("Lỗi chi tiết tại Server:", error.message);
    res.status(500).json({ 
      message: "Không thể lấy tin từ báo Lao Động", 
      error: error.message 
    });
  }
});

app.listen(5000, () => console.log('Backend đang chạy tại http://localhost:5000'));