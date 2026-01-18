import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function NewsCard({ news }) {

  //Kiem tra bài đã lưu chưa(isSaved)
  const [isSaved, setIsSaved] = useState(false);

  //Kiểm tra đã lưu vào localStorage hay chưa
  useEffect(() => {
    const saveList = JSON.parse(localStorage.getItem("saved_news")) || [];
    //kieerm tra id 
    const exists = saveList.some(item => item.link === news.link);
    setIsSaved(exists);
  }, [news.link]);

  const handleBookmark = () => {
    //lấy danh sách cũ ra, nếu đã lưu thì click = bỏ lưu và ngược lại
    const savedList = JSON.parse(localStorage.getItem("saved_news")) || [];

    if(isSaved) {
      const newList = savedList.filter(item => item.link !== news.link);
      localStorage.setItem("saved_news", JSON.stringify(newList));
      setIsSaved(false);
    }
    else {
      savedList.push(news);
      localStorage.setItem("saved_news", JSON.stringify(savedList));
      setIsSaved(true);
    }
  };

  // format Data
  const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month:'2-digit',
      year: 'numeric'
    });
  };
  return (
    <div className="relative group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">

      <button onClick={handleBookmark} className={`absolute top-2 right-2 p-2 rounded-full shadow-md z-10 transition-colors ${
          isSaved ? "bg-red-600 text-white" : "bg-white text-gray-400 hover:text-red-500"}`} 
          title={isSaved? "Bỏ lưu" : "Lưu tin này"}>
          📌
      </button>
      <img 
        src={news.image} 
        alt={news.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-5">
        <div className="flex items-center text-xs text-gray-400 mb-2">
           <span className="mr-1">🕒</span>
           <span>{formatDate(news.date)}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h3>
        
        {/* SỬA TẠI ĐÂY: Sử dụng /news-detail và tham số ?url= */}
        <Link 
          to={`/news-detail?url=${encodeURIComponent(news.link)}&date=${encodeURIComponent(news.date)}`} 
          className="text-red-700 font-bold flex items-center hover:text-red-800 transition-colors"
        >
          Xem chi tiết <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}