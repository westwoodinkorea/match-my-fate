
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, FileText, Heart, MessageCircle, Calendar } from "lucide-react";

const SimpleProcess = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "회원가입 및 로그인",
      description: "간단한 회원가입으로 시작하세요"
    },
    {
      number: "02", 
      icon: FileText,
      title: "서비스 신청",
      description: "소개팅 신청서를 작성해주세요"
    },
    {
      number: "03",
      icon: Heart,
      title: "매칭 제안",
      description: "관리자가 맞춤 상대를 제안합니다"
    },
    {
      number: "04",
      icon: Calendar,
      title: "수락 또는 거절",
      description: "제안받은 상대를 검토하고 선택하세요"
    },
    {
      number: "05",
      icon: MessageCircle,
      title: "1:1 채팅 생성",
      description: "매칭 성공 시 1:1 채팅방이 생성됩니다"
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 sm:mb-20 animate-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient">5단계</span> 간편 프로세스
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto px-4">
            복잡한 절차 없이, 단 5단계로 특별한 인연을 만나보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative border-border/50 glass-card hover-glow animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-warm-glow flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-base">{step.number}</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 mt-4 shadow-soft">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleProcess;
