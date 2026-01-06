import { Routes, Route } from "react-router-dom"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Category from "./pages/Category";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Khu vực thay đổi nội dung */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* slug - viec lam  */}
          <Route path="/category/:slug" element ={<Category/>} />

        
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;