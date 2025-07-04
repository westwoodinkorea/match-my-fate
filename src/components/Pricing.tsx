
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "5회권",
      price: "99,000",
      description: "첫 시작하는 분들에게 추천",
      features: [
        "매칭 5회 제공",
        "전문 매니저 추천",
        "프로필 검증",
        "채팅 기능",
        "고객지원"
      ],
      popular: false
    },
    {
      name: "10회권", 
      price: "179,000",
      description: "가장 인기있는 선택",
      features: [
        "매칭 10회 제공",
        "전문 매니저 추천",
        "프로필 검증",
        "채팅 기능",
        "우선 고객지원",
        "매칭 성공률 리포트"
      ],
      popular: true
    },
    {
      name: "무제한 월정액",
      price: "49,000",
      description: "진지한 만남을 원하는 분들께",
      features: [
        "무제한 매칭 (월 최대 30회)",
        "전문 매니저 추천",
        "프로필 검증",
        "채팅 기능",
        "24시간 고객지원",
        "매칭 성공률 리포트",
        "프리미엄 프로필 노출"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-rosegold-25 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">마침</span> 요금제
          </h2>
          <p className="text-lg sm:text-xl text-bluegray-600 max-w-2xl mx-auto px-4">
            당신에게 맞는 플랜을 선택하고 특별한 만남을 시작하세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-elegant animate-slide-up ${
                plan.popular 
                  ? 'border-rosegold-400 shadow-lg lg:scale-105' 
                  : 'border-rosegold-100 hover:border-rosegold-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-rosegold-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    가장 인기
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-bluegray-800 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gradient">₩{plan.price}</span>
                  {plan.name.includes('월정액') && <span className="text-bluegray-500">/월</span>}
                </div>
                <p className="text-sm sm:text-base text-bluegray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-rosegold-500 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-bluegray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-base sm:text-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-rosegold-500 hover:bg-rosegold-600 text-white shadow-elegant'
                      : 'bg-white border-2 border-rosegold-300 text-rosegold-700 hover:bg-rosegold-50'
                  }`}
                >
                  선택하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
