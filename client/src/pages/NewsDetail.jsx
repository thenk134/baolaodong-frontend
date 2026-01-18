
//import { useParams, Link } from "react-router-dom";
//import {NEWS_DATA} from '../data'
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function NewsDetail() {
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const targetUrl = searchParams.get("url");
  const articleDate = searchParams.get("date");
  useEffect(() => {
    if (!targetUrl) return;

    setLoading(true); // Reset trạng thái loading khi đổi link
    fetch(`http://localhost:5000/api/news-detail?url=${encodeURIComponent(targetUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi Fetch:", err);
        setLoading(false);
      });
  }, [targetUrl]);
  // format date - như newscard
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN', {
        weekday: 'long',
        hour: '2-digit', minute: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  // Hiển thị trạng thái loading đẹp hơn
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto mb-3"></div>
        <p className="mt-4 text-gray-400 font-medium">Đang tải nội dung bài viết...</p>
      </div>
    );
  }

  // Trường hợp không có dữ liệu
  if (!article || !article.title) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Không tìm thấy nội dung bài viết.</p>
        <Link to="/" className="text-blue-600 underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl bg-white mt-5 shadow-2xl rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-100">
        <Link to="/" className="text-blue-600 font-bold mb-8 inline-flex items-center hover:translate-x-[-4px] transition-transform">
          <span className="mr-2">←</span> Quay lại
        </Link>
        <div className="flex justify-end mb-4">
          <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center space-x-2 text-sm text-gray-600 font-medium">
            <span>📅</span>
            <span>{formatDate(articleDate)}</span>
          </div>
        </div>
      </div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>
        
        {/* Tóm tắt bài viết */}
        {article.description && (
          <p className="font-bold text-gray-700 mb-8 text-xl leading-relaxed border-l-4 border-red-700 pl-5 bg-gray-50 py-4 rounded-r-lg">
            {article.description}
          </p>
        )}
      </header>
      
      {/* Nội dung chi tiết - Thêm class Tailwind Typography để định dạng ảnh và chữ */}
      <div 
        className="news-content-body text-gray-800 text-lg leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
      
      <footer className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-gray-400 italic text-sm">
        <span>Nguồn: {new URL(targetUrl).hostname}</span>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-gray-500 hover:text-red-700 not-italic font-bold"
        >
          Lên đầu trang ↑
        </button>
      </footer>
    </main>
  );
}