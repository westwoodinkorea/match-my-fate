
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BasicInfoSection from "@/components/forms/BasicInfoSection";
import BackgroundInfoSection from "@/components/forms/BackgroundInfoSection";
import LifestyleSection from "@/components/forms/LifestyleSection";
import IdealTypeSection from "@/components/forms/IdealTypeSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";

interface ApplicationProps {
  user: User | null;
  session: Session | null;
}

const Application = ({ user, session }: ApplicationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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

  // 사용자 인증 확인 및 기존 데이터 로드
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        toast({
          variant: "destructive",
          title: "로그인 필요",
          description: "신청서 작성을 위해 로그인이 필요합니다."
        });
        navigate("/login");
        return;
      }
      
      // 기존 신청서 데이터 로드
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existingApplication) {
        setFormData({
          name: existingApplication.name || "",
          gender: existingApplication.gender || "",
          birthDate: existingApplication.age ? new Date(new Date().getFullYear() - existingApplication.age, 0, 1) : undefined,
          residence: existingApplication.location || "",
          hometown: "",
          contact: "",
          occupation: existingApplication.occupation || "",
          company: "",
          education: existingApplication.education || "",
          school: "",
          height: "",
          mbti: "",
          smoking: existingApplication.lifestyle_smoking || "",
          drinking: existingApplication.lifestyle_drinking || "",
          religion: existingApplication.religion || "",
          maritalStatus: "",
          hobbies: existingApplication.hobbies?.join(", ") || "",
          idealAgeMin: existingApplication.ideal_age_min?.toString() || "",
          idealAgeMax: existingApplication.ideal_age_max?.toString() || "",
          personalityKeywords: [],
          idealReligion: "",
          preferredConditions: "",
          avoidConditions: "",
          allowedMaritalStatus: "",
          appearanceConditions: "",
          occupationConditions: "",
          idealMbti: ""
        });
      }
    };
    
    loadUserData();
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "로그인이 필요합니다."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 나이 계산 (생년월일 기준)
      const age = formData.birthDate 
        ? new Date().getFullYear() - formData.birthDate.getFullYear()
        : null;
      
      // 취미를 배열로 변환
      const hobbiesArray = formData.hobbies 
        ? formData.hobbies.split(",").map(hobby => hobby.trim()).filter(hobby => hobby)
        : [];
      
      // 신청서 데이터 구성
      const applicationData = {
        user_id: user.id,
        name: formData.name,
        age: age,
        gender: formData.gender,
        location: formData.residence,
        occupation: formData.occupation,
        education: formData.education,
        family_background: "",
        religion: formData.religion,
        personality: formData.personalityKeywords.join(", "),
        hobbies: hobbiesArray,
        ideal_age_min: formData.idealAgeMin ? parseInt(formData.idealAgeMin) : null,
        ideal_age_max: formData.idealAgeMax ? parseInt(formData.idealAgeMax) : null,
        ideal_gender: formData.gender === "male" ? "female" : "male", // 반대 성별로 설정
        ideal_location: formData.residence,
        ideal_occupation: formData.occupationConditions,
        ideal_education: formData.education,
        ideal_personality: formData.personalityKeywords.join(", "),
        lifestyle_smoking: formData.smoking,
        lifestyle_drinking: formData.drinking,
        lifestyle_exercise: "",
        lifestyle_travel: "",
        lifestyle_pets: "",
        introduction: `${formData.preferredConditions}\n\n피하고 싶은 조건: ${formData.avoidConditions}`,
        status: 'submitted'
      };
      
      // 기존 신청서가 있는지 확인
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      let error;
      
      if (existingApplication) {
        // 업데이트
        const { error: updateError } = await supabase
          .from('applications')
          .update(applicationData)
          .eq('user_id', user.id);
        error = updateError;
      } else {
        // 새로 생성
        const { error: insertError } = await supabase
          .from('applications')
          .insert([applicationData]);
        error = insertError;
      }
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "신청 완료",
        description: "신청서가 성공적으로 제출되었습니다! 관리자가 검토 후 매칭을 제안해드릴 예정입니다."
      });
      
      // 매칭 페이지로 이동
      navigate("/matching");
      
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요."
      });
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                  className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3 text-lg disabled:opacity-50"
                >
                  {isLoading ? "제출 중..." : "신청서 제출하기"}
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
