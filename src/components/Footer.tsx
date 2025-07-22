
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 border-t border-border py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 sm:mb-16">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-full gradient-warm-glow flex items-center justify-center shadow-soft">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-3xl font-bold text-gradient">마침</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-md text-base sm:text-lg leading-relaxed">
              마침을 통해 마침, 내 편을 만났다.<br />
              신뢰 기반의 프리미엄 매칭 서비스로 특별한 인연을 만들어가세요.
            </p>
            <div className="text-sm sm:text-base text-muted-foreground/80 space-y-1">
              <p className="font-medium">고객센터: 1588-0000</p>
              <p>평일 10:00-18:00 (토/일/공휴일 휴무)</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-foreground">서비스</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors hover:underline">서비스 소개</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors hover:underline">이용 방법</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors hover:underline">요금제</Link></li>
              <li><Link to="/success-stories" className="hover:text-primary transition-colors hover:underline">성공 사례</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-foreground">고객지원</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors hover:underline">자주 묻는 질문</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors hover:underline">문의하기</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors hover:underline">개인정보처리방침</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors hover:underline">이용약관</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 sm:pt-10 text-center">
          <p className="text-muted-foreground/80 text-sm sm:text-base">
            © 2024 마침. All rights reserved. | 사업자등록번호: 000-00-00000
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
