import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Category from "./pages/Category";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Đặt ScrollToTop ở đây để mỗi lần chuyển Route 
         màn hình sẽ tự động cuộn lên đầu trang 
      */}
      <ScrollToTop /> 
      
      <Header />
      
      <main className="flex-grow">
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />

          {/* Trang chi tiết bài viết */}
          <Route path="/news-detail" element={<NewsDetail />} />

          {/* Trang chuyên mục (slug: thoi-su, viec-lam...) */}
          <Route path="/category/:slug" element={<Category />} />

          {/* Trang tìm kiếm */}
          <Route path="/search" element={<Search />} />

          {/*Trang mục đã lưu*/}
          <Route path="/bookmarks" element={<Bookmarks/>}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;