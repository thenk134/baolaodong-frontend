import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

export default function Category() {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

 // Category.jsx
useEffect(() => {
  setLoading(true);
  // Đổi 'nld' thành 'tuoitre' để khớp với link RSS bạn muốn lấy
  fetch(`http://localhost:5000/api/news/tuoitre/${slug}`) 
    .then(res => res.json())
    .then(data => {
      setNews(Array.isArray(data) ? data : []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Lỗi:", err);
      setLoading(false);
    });
}, [slug]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Tiêu đề chuyên mục với màu sắc NLĐ */}
      <h2 className="text-2xl font-black border-l-4 border-red-700 pl-4 mb-8 uppercase text-red-700 tracking-tight">
        Chuyên mục: {slug.replace(/-/g, ' ')}
      </h2>

      {loading ? (
        // Hiệu ứng Loading Skeleton đơn giản
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : news.length > 0 ? (
        // Danh sách tin bài dạng Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </div>
      ) : (
        // Thông báo khi không có tin
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Hiện chưa có tin mới trong chuyên mục này.</p>
          <p className="text-sm italic">Vui lòng quay lại sau.</p>
        </div>
      )}
    </div>
  );
}