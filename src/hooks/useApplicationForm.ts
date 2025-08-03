import { useState } from "react";

export interface ApplicationFormData {
  name: string;
  gender: string;
  birthDate: Date | undefined;
  residence: string;
  hometown: string;
  contact: string;
  occupation: string;
  company: string;
  education: string;
  school: string;
  height: string;
  mbti: string;
  smoking: string;
  drinking: string;
  religion: string;
  maritalStatus: string;
  hobbies: string;
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
  name: "",
  gender: "",
  birthDate: undefined,
  residence: "",
  hometown: "",
  contact: "",
  occupation: "",
  company: "",
  education: "",
  school: "",
  height: "",
  mbti: "",
  smoking: "",
  drinking: "",
  religion: "",
  maritalStatus: "",
  hobbies: "",
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
   
   // 생년월일 파싱
   let birthDate: Date | undefined;
   if (application?.birth_date) {
     birthDate = new Date(application.birth_date);
   }
   
   // introduction 텍스트에서 각 필드 파싱
   const introduction = application?.introduction || "";
   let preferredConditions = "";
   let avoidConditions = "";
   
   if (introduction.includes("선호하는 조건:")) {
     const parts = introduction.split("피하고 싶은 조건:");
     preferredConditions = parts[0].replace("선호하는 조건:", "").trim();
     avoidConditions = parts[1] || "";
   }
   
   // personality_keywords 파싱
   let personalityKeywords: string[] = [];
   if (application?.personality_keywords) {
     if (typeof application.personality_keywords === 'string') {
       personalityKeywords = application.personality_keywords.split(',').map((k: string) => k.trim()).filter(Boolean);
     } else if (Array.isArray(application.personality_keywords)) {
       personalityKeywords = application.personality_keywords;
     }
   }
   
   const newFormData: ApplicationFormData = {
     name: application?.name || "",
     gender: application?.gender || "",
     birthDate: birthDate,
     residence: application?.location || "",
     hometown: application?.hometown || "",
     contact: application?.contact || "",
     occupation: application?.occupation || "",
     company: application?.company || "",
     education: application?.education || "",
     school: application?.school || "",
     height: application?.height ? String(application.height) : "",
     mbti: application?.mbti || "",
     smoking: application?.smoking || "",
     drinking: application?.drinking || "",
     religion: application?.religion || "",
     maritalStatus: application?.marital_status || "",
     hobbies: application?.hobbies || "",
     idealAgeMin: application?.ideal_age_min ? String(application.ideal_age_min) : "",
     idealAgeMax: application?.ideal_age_max ? String(application.ideal_age_max) : "",
     personalityKeywords: personalityKeywords,
     idealReligion: application?.ideal_religion || "",
     preferredConditions: preferredConditions,
     avoidConditions: avoidConditions,
     allowedMaritalStatus: application?.allowed_marital_status || "",
     appearanceConditions: application?.appearance_conditions || "",
     occupationConditions: application?.occupation_conditions || "",
     idealMbti: application?.ideal_mbti || ""
   };
   
   console.log('New form data:', newFormData);
   setFormData(newFormData);
 };

  return {
    formData,
    handleInputChange,
    handlePersonalityKeywordChange,
    setFormDataFromApplication
  };
};
