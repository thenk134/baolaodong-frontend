import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <img 
        src={news.image} 
        alt={news.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h3>
        
        {/* SỬA TẠI ĐÂY: Sử dụng /news-detail và tham số ?url= */}
        <Link 
          to={`/news-detail?url=${encodeURIComponent(news.link)}`} 
          className="text-red-700 font-bold flex items-center hover:text-red-800 transition-colors"
        >
          Xem chi tiết <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}