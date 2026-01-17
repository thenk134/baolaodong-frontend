import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";

    export default function Bookmarks() {
        const [savedNews, setSaveNews] = useState([]);

        // khi vào trang, lấy dữ liệu từ localStorage
        useEffect(()=> {
            const data = JSON.parse(localStorage.getItem("saved_news")) || [];
            setSaveNews(data);
        }, []) ;

        return (
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <h1 className="text-2xl font-black border-l-4 border-blue-600 pl-4 mb-8 uppercase text-blue-800">
                    Tin đã lưu ({savedNews.length})
                </h1>

                {savedNews.length  === 0 ? (
                 <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4"> 
                        Bạn chưa lưu tin tức nào cả.
                    </p>
                    <Link to="/" className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">
                    Quay về trang chủ đọc báo
                    </Link>
                 </div>
                ) : ( 
                    <div className="grid grid-cols-1 md:grids-cols-2 lg:grid-cols-3 gap-6">
                        {savedNews.map((item,index) => (
                            <NewsCard key={index} news={item} />
                        ))}

                    </div>
                )}
            </div>
        );
    }