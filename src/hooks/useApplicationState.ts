import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ApplicationFormData } from "./useApplicationForm";

export const useApplicationState = (user: User | null) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      const { data: existing } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existing) {
        setExistingApplication(existing);
        
        // 이미 제출된 신청서가 있다면 (status가 'submitted'인 경우)
        if (existing.status === 'submitted') {
          // 매칭 페이지로 리디렉트하거나 편집 모드 제안
          toast({
            title: "신청서가 이미 제출되었습니다",
            description: "이미 제출된 신청서가 있습니다. 정보를 수정하시겠습니까?",
          });
          setIsEditMode(true);
        }
      }
    };
    
    loadUserData();
  }, [user, navigate, toast]);

  const submitApplication = async (formData: ApplicationFormData) => {
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
        title: isEditMode ? "정보 수정 완료" : "신청 완료",
        description: isEditMode 
          ? "정보가 성공적으로 수정되었습니다!" 
          : "신청서가 성공적으로 제출되었습니다! 관리자가 검토 후 매칭을 제안해드릴 예정입니다."
      });
      
      // 매칭 페이지로 이동 (기존 신청서가 있던 경우도 포함)
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

  return {
    isLoading,
    existingApplication,
    isEditMode,
    submitApplication
  };
};