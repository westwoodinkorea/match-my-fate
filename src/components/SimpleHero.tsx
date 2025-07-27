
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-in">
          <div className="inline-flex items-center space-x-2 mb-8 px-4 py-3 rounded-full glass-card shadow-soft hover-glow">
            <Heart className="w-4 h-4 text-primary animate-bounce-soft" />
            <span className="text-sm font-medium text-primary">5단계 간편 매칭</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gradient text-glow">마침</span>을 통해<br />
            <span className="text-foreground">마침</span>, 내 편을 만났다
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed px-4">
            단 5단계로 완성되는 프리미엄 매칭 서비스<br className="hidden sm:block" />
            <span className="font-semibold text-primary">신청부터 만남까지, 간단하고 확실하게</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 px-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button 
                variant="premium"
                size="xl" 
                className="w-full sm:w-auto font-semibold"
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
