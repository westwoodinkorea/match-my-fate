
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rosegold-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full gradient-rosegold flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">마침</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-bluegray-700 hover:text-rosegold-600 transition-colors">
            서비스 소개
          </Link>
          <Link to="/how-it-works" className="text-bluegray-700 hover:text-rosegold-600 transition-colors">
            이용 방법
          </Link>
          <Link to="/pricing" className="text-bluegray-700 hover:text-rosegold-600 transition-colors">
            요금제
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-bluegray-700 hover:text-rosegold-600">
              로그인
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-rosegold-500 hover:bg-rosegold-600 text-white shadow-elegant">
              시작하기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
