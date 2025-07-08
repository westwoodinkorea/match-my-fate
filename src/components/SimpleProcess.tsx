
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, FileText, Heart, CreditCard, Calendar } from "lucide-react";

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
      icon: CreditCard,
      title: "결제 및 만남",
      description: "수락 시 결제 후 연결이 완료됩니다"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">5단계</span> 간편 프로세스
          </h2>
          <p className="text-lg sm:text-xl text-bluegray-600 max-w-2xl mx-auto px-4">
            복잡한 절차 없이, 단 5단계로 특별한 인연을 만나보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative border-rosegold-100 hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-rosegold-50 flex items-center justify-center mx-auto mb-4 mt-2">
                  <step.icon className="w-6 h-6 text-rosegold-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-bluegray-800">
                  {step.title}
                </h3>
                <p className="text-sm text-bluegray-600 leading-relaxed">
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
