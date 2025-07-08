
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-rosegold opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-6 px-3 py-2 rounded-full bg-rosegold-50 border border-rosegold-200">
            <Heart className="w-4 h-4 text-rosegold-600" />
            <span className="text-xs sm:text-sm text-rosegold-700 font-medium">5단계 간편 매칭</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">마침</span>을 통해<br />
            <span className="text-bluegray-800">마침</span>, 내 편을 만났다
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-bluegray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            단 5단계로 완성되는 프리미엄 매칭 서비스<br className="hidden sm:block" />
            <span className="font-semibold text-rosegold-600">신청부터 만남까지, 간단하고 확실하게</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-rosegold-500 hover:bg-rosegold-600 text-white px-8 py-4 text-base sm:text-lg shadow-elegant hover:shadow-lg transition-all duration-300"
              >
                지금 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;
