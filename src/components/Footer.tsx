
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bluegray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full gradient-rosegold flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-bold">마침</span>
            </div>
            <p className="text-bluegray-300 mb-6 max-w-md text-sm sm:text-base">
              마침을 통해 마침, 내 편을 만났다.<br />
              신뢰 기반의 프리미엄 매칭 서비스로 특별한 인연을 만들어가세요.
            </p>
            <div className="text-xs sm:text-sm text-bluegray-400">
              <p>고객센터: 1588-0000</p>
              <p>평일 10:00-18:00 (토/일/공휴일 휴무)</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-bluegray-300 text-sm sm:text-base">
              <li><Link to="/about" className="hover:text-rosegold-300 transition-colors">서비스 소개</Link></li>
              <li><Link to="/how-it-works" className="hover:text-rosegold-300 transition-colors">이용 방법</Link></li>
              <li><Link to="/pricing" className="hover:text-rosegold-300 transition-colors">요금제</Link></li>
              <li><Link to="/success-stories" className="hover:text-rosegold-300 transition-colors">성공 사례</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2 text-bluegray-300 text-sm sm:text-base">
              <li><Link to="/faq" className="hover:text-rosegold-300 transition-colors">자주 묻는 질문</Link></li>
              <li><Link to="/contact" className="hover:text-rosegold-300 transition-colors">문의하기</Link></li>
              <li><Link to="/privacy" className="hover:text-rosegold-300 transition-colors">개인정보처리방침</Link></li>
              <li><Link to="/terms" className="hover:text-rosegold-300 transition-colors">이용약관</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-bluegray-700 pt-6 sm:pt-8 text-center">
          <p className="text-bluegray-400 text-xs sm:text-sm">
            © 2024 마침. All rights reserved. | 사업자등록번호: 000-00-00000
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
