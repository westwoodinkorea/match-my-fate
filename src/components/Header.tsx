
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rosegold-100">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full gradient-rosegold flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">마침</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-bluegray-700" />
          ) : (
            <Menu className="w-6 h-6 text-bluegray-700" />
          )}
        </button>
        
        {/* Desktop navigation */}
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
        
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-4">
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
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-rosegold-100">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/about" 
              className="block py-2 text-bluegray-700 hover:text-rosegold-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              서비스 소개
            </Link>
            <Link 
              to="/how-it-works" 
              className="block py-2 text-bluegray-700 hover:text-rosegold-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              이용 방법
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-bluegray-700 hover:text-rosegold-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              요금제
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t border-rosegold-100">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-bluegray-700 hover:text-rosegold-600">
                  로그인
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white shadow-elegant">
                  시작하기
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
