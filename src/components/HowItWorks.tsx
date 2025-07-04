
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "회원가입 & 본인인증",
      description: "간편한 회원가입 후 신분증 또는 재직증명서로 본인인증을 완료하세요."
    },
    {
      number: "02", 
      title: "프로필 등록",
      description: "기본정보, 배경정보, 생활습관, 자기소개까지 상세한 프로필을 작성해주세요."
    },
    {
      number: "03",
      title: "이상형 조건 설정",
      description: "원하는 조건과 피하고 싶은 조건을 상세히 입력해주시면 매니저가 참고합니다."
    },
    {
      number: "04",
      title: "매일 1명 추천",
      description: "전문 매니저가 분석한 최적의 상대를 하루 1명씩 추천해드립니다."
    },
    {
      number: "05",
      title: "매칭 & 결제",
      description: "양측이 수락하면 결제 후 채팅을 시작할 수 있습니다."
    },
    {
      number: "06",
      title: "만남 & 후기",
      description: "실제 만남 후 후기를 작성하여 다음 매칭의 정확도를 높여나갑니다."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">마침</span> 이용방법
          </h2>
          <p className="text-lg sm:text-xl text-bluegray-600 max-w-2xl mx-auto px-4">
            6단계의 간단한 과정으로 운명의 상대를 만나보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative border-rosegold-100 hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-rosegold flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">{step.number}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-bluegray-800">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-bluegray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
