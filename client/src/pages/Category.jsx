import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

export default function Category() {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch(`http://localhost:5000/api/news/nld/${slug}`)
      .then(res => res.json())
      .then(data => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-black border-l-4 border-red-700 pl-4 mb-8 uppercase">Chuyên mục: {slug.replace(/-/g, ' ')}</h2>
      {loading ? <div className="text-center py-20 text-gray-500">Đang cập nhật...</div> : (
        <div className="grid grid-cols-1 gap-6">
          {news.map((item, index) => <NewsCard key={index} news={item} />)}
        </div>
      )}
    </div>
  );
}