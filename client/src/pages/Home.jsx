import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/home-laodong")
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-black border-l-4 border-red-700 pl-4 mb-8 uppercase">Tin mới nhất - Báo Lao Động</h1>
      {loading ? <div className="text-center py-20 animate-pulse text-gray-500">Đang tải tin tức...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => <NewsCard key={index} news={item} />)}
        </div>
      )}
    </div>
  );
}