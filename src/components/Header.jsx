import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 1. Top Bar: Logo và Tìm kiếm */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-red-700 text-white font-black px-3 py-1 rounded-sm text-2xl">
            NLĐ
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold text-red-700 tracking-tighter">NGƯỜI LAO ĐỘNG</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Tin tức & Việc làm</p>
          </div>
        </div>

        {/* Search Box (Ẩn trên mobile nhỏ, hiện trên tablet/desktop) */}
        <div className="hidden sm:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 w-72">
          <input 
            type="text" 
            placeholder="Tìm kiếm tin tức..." 
            className="bg-transparent focus:outline-none text-sm w-full"
          />
          <button className="text-gray-400 hover:text-red-700">
            🔍
          </button>
        </div>
      </div>

      {/* 2. Navigation Menu: Các chuyên mục */}
      <nav className="bg-red-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-2.5 text-white text-sm font-bold uppercase whitespace-nowrap">
            <li className="hover:text-yellow-300 cursor-pointer transition">Trang chủ</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Thời sự</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Việc làm</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Pháp luật</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Bảo hiểm</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Công đoàn</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Sức khỏe</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}