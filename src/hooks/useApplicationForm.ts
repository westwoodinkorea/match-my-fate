import { useState } from "react";

export interface ApplicationFormData {
  // 기본 정보
  name: string;
  gender: string;
  birthDate: Date | undefined;
  residence: string;
  hometown: string;
  contact: string;
  // 배경 정보
  occupation: string;
  company: string;
  education: string;
  school: string;
  height: string;
  mbti: string;
  // 생활 습관 및 가치관
  smoking: string;
  drinking: string;
  religion: string;
  maritalStatus: string;
  hobbies: string;
  // 이상형 조건
  idealAgeMin: string;
  idealAgeMax: string;
  personalityKeywords: string[];
  idealReligion: string;
  preferredConditions: string;
  avoidConditions: string;
  allowedMaritalStatus: string;
  appearanceConditions: string;
  occupationConditions: string;
  idealMbti: string;
}

const initialFormData: ApplicationFormData = {
  // 기본 정보
  name: "",
  gender: "",
  birthDate: undefined,
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
  personalityKeywords: [],
  idealReligion: "",
  preferredConditions: "",
  avoidConditions: "",
  allowedMaritalStatus: "",
  appearanceConditions: "",
  occupationConditions: "",
  idealMbti: ""
};

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

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

  const setFormDataFromApplication = (application: any, userEmail: string) => {
    console.log('Setting form data from application:', application);
    
    // introduction에서 preferredConditions와 avoidConditions 분리
    const introduction = application.introduction || "";
    const [preferredPart, avoidPart] = introduction.split("\n\n원하고 싶지 않은 조건: ");
    
    // age에서 birthDate 계산
    const currentYear = new Date().getFullYear();
    const birthYear = application.age ? currentYear - application.age : currentYear - 25;
    const calculatedBirthDate = application.age ? new Date(birthYear, 0, 1) : undefined;
    
    // personality에서 personalityKeywords 배열 생성
    const personalityKeywords = application.personality ? 
      application.personality.split(", ").filter((item: string) => item.trim()) : [];
    
    // hobbies 배열을 문자열로 변환
    const hobbiesString = Array.isArray(application.hobbies) ? 
      application.hobbies.join(", ") : 
      (application.hobbies || "");
    
    const mappedFormData: ApplicationFormData = {
      // 기본 정보 - DB 필드와 매핑
      name: application.name || "",
      gender: application.gender || "",
      birthDate: calculatedBirthDate,
      residence: application.location || "",
      hometown: application.location || "", // location을 hometown으로도 사용
      contact: userEmail || "",
      
      // 배경 정보
      occupation: application.occupation || "",
      company: "", // DB에 없는 필드
      education: application.education || "",
      school: "", // DB에 없는 필드
      height: "", // DB에 없는 필드
      mbti: "", // DB에 없는 필드
      
      // 생활 습관 및 가치관
      smoking: application.lifestyle_smoking || "",
      drinking: application.lifestyle_drinking || "",
      religion: application.religion || "",
      maritalStatus: "", // DB에 없는 필드
      hobbies: hobbiesString,
      
      // 이상형 조건
      idealAgeMin: application.ideal_age_min?.toString() || "",
      idealAgeMax: application.ideal_age_max?.toString() || "",
      personalityKeywords: personalityKeywords,
      idealReligion: application.religion || "", // religion을 idealReligion으로도 사용
      preferredConditions: preferredPart || "",
      avoidConditions: avoidPart || "",
      allowedMaritalStatus: "", // DB에 없는 필드
      appearanceConditions: "", // DB에 없는 필드
      occupationConditions: application.ideal_occupation || "",
      idealMbti: "" // DB에 없는 필드
    };
    
    console.log('Mapped form data:', mappedFormData);
    setFormData(mappedFormData);
  };

  return {
    formData,
    handleInputChange,
    handlePersonalityKeywordChange,
    setFormDataFromApplication
  };
};
