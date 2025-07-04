
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Star, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "철저한 본인 인증",
      description: "신분증, 재직증명서를 통한 엄격한 검증으로 신뢰할 수 있는 프로필만을 제공합니다."
    },
    {
      icon: Heart,
      title: "매니저 1:1 추천",
      description: "전문 매니저가 당신의 이상형 조건을 분석하여 하루 1명씩 신중하게 추천해드립니다."
    },
    {
      icon: Star,
      title: "프리미엄 매칭",
      description: "양측이 수락하고 결제 완료 시에만 연결되는 프리미엄 매칭 시스템으로 진정성을 보장합니다."
    },
    {
      icon: Users,
      title: "성공 후기 기반",
      description: "만남 후 작성하는 후기를 다음 매칭에 반영하여 더욱 정확한 추천을 제공합니다."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-rosegold-25">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            왜 <span className="text-gradient">마침</span>인가요?
          </h2>
          <p className="text-xl text-bluegray-600 max-w-2xl mx-auto">
            가벼운 소개팅 앱도, 부담스러운 결혼정보회사도 아닌<br />
            딱 맞는 중간 지점의 신뢰할 수 있는 매칭 서비스
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-rosegold-100 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full gradient-rosegold flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-bluegray-800">
                  {feature.title}
                </h3>
                <p className="text-bluegray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
