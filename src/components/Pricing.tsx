
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
    <section className="py-24 bg-gradient-to-b from-rosegold-25 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">마침</span> 요금제
          </h2>
          <p className="text-xl text-bluegray-600 max-w-2xl mx-auto">
            당신에게 맞는 플랜을 선택하고 특별한 만남을 시작하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-elegant animate-slide-up ${
                plan.popular 
                  ? 'border-rosegold-400 shadow-lg scale-105' 
                  : 'border-rosegold-100 hover:border-rosegold-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-rosegold-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    가장 인기
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-bluegray-800 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gradient">₩{plan.price}</span>
                  {plan.name.includes('월정액') && <span className="text-bluegray-500">/월</span>}
                </div>
                <p className="text-bluegray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-rosegold-500 mr-3 flex-shrink-0" />
                      <span className="text-bluegray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
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
