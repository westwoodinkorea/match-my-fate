
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BasicInfoSection from "@/components/forms/BasicInfoSection";
import BackgroundInfoSection from "@/components/forms/BackgroundInfoSection";
import LifestyleSection from "@/components/forms/LifestyleSection";
import IdealTypeSection from "@/components/forms/IdealTypeSection";

const Application = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    gender: "",
    birthDate: undefined as Date | undefined,
    residence: "",
    hometown: "",
    contact: "",
    
    // 배경 정보
    occupation: "",
    company: "",
    education: "",
    school: "",
    height: "",
    mbti: "",
    
    // 생활 습관 및 가치관
    smoking: "",
    drinking: "",
    religion: "",
    maritalStatus: "",
    hobbies: "",
    
    // 이상형 조건
    idealAgeMin: "",
    idealAgeMax: "",
    personalityKeywords: [] as string[],
    idealReligion: "",
    preferredConditions: "",
    avoidConditions: "",
    allowedMaritalStatus: "",
    appearanceConditions: "",
    occupationConditions: "",
    idealMbti: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("신청이 완료되었습니다! 관리자가 검토 후 매칭을 제안해드릴 예정입니다.");
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalityKeywordChange = (keyword: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      personalityKeywords: checked 
        ? [...prev.personalityKeywords, keyword]
        : prev.personalityKeywords.filter(k => k !== keyword)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-bold text-gradient">마침</span>
              </div>
              <CardTitle className="text-2xl text-bluegray-800">
                소개팅 신청서
              </CardTitle>
              <p className="text-bluegray-600">
                정확한 매칭을 위해 상세한 정보를 입력해주세요
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <BasicInfoSection 
                  formData={{
                    name: formData.name,
                    gender: formData.gender,
                    birthDate: formData.birthDate,
                    residence: formData.residence,
                    hometown: formData.hometown,
                    contact: formData.contact
                  }}
                  onInputChange={handleInputChange}
                />

                <BackgroundInfoSection 
                  formData={{
                    occupation: formData.occupation,
                    company: formData.company,
                    education: formData.education,
                    school: formData.school,
                    height: formData.height,
                    mbti: formData.mbti
                  }}
                  onInputChange={handleInputChange}
                />

                <LifestyleSection 
                  formData={{
                    smoking: formData.smoking,
                    drinking: formData.drinking,
                    religion: formData.religion,
                    maritalStatus: formData.maritalStatus,
                    hobbies: formData.hobbies
                  }}
                  onInputChange={handleInputChange}
                />

                <IdealTypeSection 
                  formData={{
                    idealAgeMin: formData.idealAgeMin,
                    idealAgeMax: formData.idealAgeMax,
                    personalityKeywords: formData.personalityKeywords,
                    idealReligion: formData.idealReligion,
                    preferredConditions: formData.preferredConditions,
                    avoidConditions: formData.avoidConditions,
                    allowedMaritalStatus: formData.allowedMaritalStatus,
                    appearanceConditions: formData.appearanceConditions,
                    occupationConditions: formData.occupationConditions,
                    idealMbti: formData.idealMbti
                  }}
                  onInputChange={handleInputChange}
                  onPersonalityKeywordChange={handlePersonalityKeywordChange}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3 text-lg"
                >
                  신청서 제출하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Application;
