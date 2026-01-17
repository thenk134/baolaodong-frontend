import React, { useState } from 'react'; // Thêm useState
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
//import { data } from 'react-router-dom';


export default function Header() {
  const [keyword, setKeyword] = useState(""); // Lưu trữ từ khóa nhập vào
  const navigate = useNavigate(); // Hook để điều hướng trang

  // Hàm xử lý khi nhấn Enter hoặc click kính lúp
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn trình duyệt load lại trang
    if (keyword.trim()) {
      // Chuyển sang trang /search với tham số q=từ-khóa
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`); 
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo giữ nguyên */}
        <div className="flex items-center space-x-2">
          <div className="bg-red-700 text-white font-black px-3 py-1 rounded-sm text-2xl">NLĐ</div>
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold text-red-700 tracking-tighter">NGƯỜI LAO ĐỘNG</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Tin tức & Việc làm</p>
          </div>
        </div>

        {/* CẬP NHẬT: Thay div bằng form để hỗ trợ nhấn phím Enter */}
        <form 
          onSubmit={handleSearch} 
          className="hidden sm:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 w-72"
        >
          <input 
            type="text" 
            placeholder="Tìm kiếm tin tức..." 
            className="bg-transparent focus:outline-none text-sm w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật từ khóa khi gõ
          />
          <button type="submit" className="text-gray-400 hover:text-red-700">
            🔍
          </button>
        </form>
      </div>

      {/* Navigation Menu giữ nguyên */}
      <nav className="bg-red-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-2.5 text-white text-sm font-bold uppercase whitespace-nowrap">
            <li><Link to="/" className="hover:text-yellow-400 transition">Trang chủ</Link></li>
            <li><Link to="/category/thoi-su" className="hover:text-yellow-400 transition">Thời sự</Link></li>
            <li><Link to="/category/viec-lam" className="hover:text-yellow-400 transition">Việc làm</Link></li>
            <li><Link to="/category/phap-luat" className="hover:text-yellow-400 transition">Pháp luật</Link></li>
            <li><Link to="/category/bao-hiem" className="hover:text-yellow-400 transition">Bảo hiểm</Link></li>
            <li><Link to="/category/cong-doan" className="hover:text-yellow-400 transition">Công đoàn</Link></li>
            <li><Link to="/category/suc-khoe" className="hover:text-yellow-400 transition">Sức khỏe</Link></li>
            <li><Link to="/bookmarks" className="hover:text-yellow-400 transition">📌 TIN ĐÃ LƯU</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}