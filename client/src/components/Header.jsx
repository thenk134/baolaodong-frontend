import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [keyword, setKeyword] = useState(""); 
  const [weather, setWeather] = useState(null); // Lưu dữ liệu thời tiết
  const navigate = useNavigate(); 

  const apiKey = "127d989b114b9d3db5aef385245818b9";
  const city = "Ho Chi Minh";

  // Logic gọi API thời tiết
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=vi`)
      .then(res => res.json())
      .then(data => {
        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            description: data.weather[0].description
          });
        }
      })
      .catch(err => console.error("Không tải được thời tiết!", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`); 
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        
        {/* Nhóm Logo và Thời tiết */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-red-700 text-white font-black px-3 py-1 rounded-sm text-2xl">NLĐ</div>
            <div className="leading-tight">
              <h1 className="text-xl font-extrabold text-red-700 tracking-tighter">NGƯỜI LAO ĐỘNG</h1>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Tin tức & Việc làm</p>
            </div>
          </Link>

          {/* Widget Thời tiết hiển thị ở đây */}
          {weather ? (
            <div className="hidden lg:flex items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-100 space-x-1">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
                alt="weather-icon" 
                className="w-8 h-8"
              />
              <div className="text-[11px] leading-tight">
                <p className="font-bold text-red-700">{weather.temp}°C</p>
                <p className="text-gray-500 capitalize">{weather.description}</p>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block w-20 h-8 bg-gray-100 animate-pulse rounded-full"></div>
          )}
        </div>

        {/* Form tìm kiếm */}
        <form 
          onSubmit={handleSearch} 
          className="hidden sm:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 w-72"
        >
          <input 
            type="text" 
            placeholder="Tìm kiếm tin tức..." 
            className="bg-transparent focus:outline-none text-sm w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="text-gray-400 hover:text-red-700">
            👌
          </button>
        </form>
      </div>

      {/* Navigation Menu */}
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