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
    
    const introduction = application.introduction || "";
    const [preferredPart, avoidPart] = introduction.split("\n\n피하고 싶은 조건: ");
    
    const formData = {
      name: application.name || "",
      gender: application.gender || "",
      birthDate: application.age ? new Date(new Date().getFullYear() - application.age, 0, 1) : undefined,
      residence: application.location || "",
      hometown: application.location || "",
      contact: "",
      occupation: application.occupation || "",
      company: "",
      education: application.education || "",
      school: "",
      height: "",
      mbti: "",
      smoking: application.lifestyle_smoking || "",
      drinking: application.lifestyle_drinking || "",
      religion: application.religion || "",
      maritalStatus: "",
      hobbies: application.hobbies?.join(", ") || "",
      idealAgeMin: application.ideal_age_min?.toString() || "",
      idealAgeMax: application.ideal_age_max?.toString() || "",
      personalityKeywords: application.personality ? application.personality.split(", ") : [],
      idealReligion: application.religion || "",
      preferredConditions: preferredPart || "",
      avoidConditions: avoidPart || "",
      allowedMaritalStatus: "",
      appearanceConditions: "",
      occupationConditions: application.ideal_occupation || "",
      idealMbti: ""
    };
    
    console.log('Mapped form data:', formData);
    setFormData(formData);
  };

  return {
    formData,
    handleInputChange,
    handlePersonalityKeywordChange,
    setFormDataFromApplication
  };
};