
import { Button } from "@/components/ui/button";
import { ArrowDown, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-rosegold opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-rosegold-50 border border-rosegold-200">
            <Heart className="w-4 h-4 text-rosegold-600" />
            <span className="text-sm text-rosegold-700 font-medium">신뢰 기반 1:1 프리미엄 매칭</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">마침</span>을 통해<br />
            <span className="text-bluegray-800">마침</span>, 내 편을 만났다
          </h1>
          
          <p className="text-xl md:text-2xl text-bluegray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            20대 후반부터 40대까지, 진정성 있는 만남을 원하는 당신을 위한<br />
            <span className="font-semibold text-rosegold-600">매니저 추천 방식의 프리미엄 매칭 서비스</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-rosegold-500 hover:bg-rosegold-600 text-white px-8 py-4 text-lg shadow-elegant hover:shadow-lg transition-all duration-300"
              >
                무료로 시작하기
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-rosegold-300 text-rosegold-700 hover:bg-rosegold-50 px-8 py-4 text-lg"
              >
                서비스 알아보기
              </Button>
            </Link>
          </div>
          
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-rosegold-400 mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-rosegold-200 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-bluegray-200 opacity-20 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
