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
   
   // 생년월일 파싱 (age로부터 역산)
   let birthDate: Date | undefined;
   if (application?.age) {
     const currentYear = new Date().getFullYear();
     const birthYear = currentYear - application.age;
     birthDate = new Date(birthYear, 0, 1); // 1월 1일로 설정
   }
   
   // introduction 텍스트에서 각 필드 파싱
   const introduction = application?.introduction || "";
   let preferredConditions = "";
   let avoidConditions = "";
   
   if (introduction.includes("피하고 싶은 조건:")) {
     const parts = introduction.split("피하고 싶은 조건:");
     preferredConditions = parts[0].trim();
     avoidConditions = parts[1] ? parts[1].trim() : "";
   } else {
     preferredConditions = introduction;
   }
   
   // personality를 personalityKeywords로 변환
   let personalityKeywords: string[] = [];
   if (application?.personality) {
     personalityKeywords = application.personality.split(',').map((k: string) => k.trim()).filter(Boolean);
   }
   
   // hobbies 배열을 문자열로 변환
   let hobbiesString = "";
   if (application?.hobbies) {
     if (Array.isArray(application.hobbies)) {
       hobbiesString = application.hobbies.join(", ");
     } else {
       hobbiesString = String(application.hobbies);
     }
   }
   
   const newFormData: ApplicationFormData = {
     name: application?.name || "",
     gender: application?.gender || "",
     birthDate: birthDate,
     residence: application?.location || "",
     hometown: "", // 데이터베이스에 없는 필드
     contact: "", // 데이터베이스에 없는 필드  
     occupation: application?.occupation || "",
     company: "", // 데이터베이스에 없는 필드
     education: application?.education || "",
     school: "", // 데이터베이스에 없는 필드
     height: "", // 데이터베이스에 없는 필드
     mbti: "", // 데이터베이스에 없는 필드
     smoking: application?.lifestyle_smoking || "",
     drinking: application?.lifestyle_drinking || "",
     religion: application?.religion || "",
     maritalStatus: "", // 데이터베이스에 없는 필드
     hobbies: hobbiesString,
     idealAgeMin: application?.ideal_age_min ? String(application.ideal_age_min) : "",
     idealAgeMax: application?.ideal_age_max ? String(application.ideal_age_max) : "",
     personalityKeywords: personalityKeywords,
     idealReligion: "", // 데이터베이스에 없는 필드
     preferredConditions: preferredConditions,
     avoidConditions: avoidConditions,
     allowedMaritalStatus: "", // 데이터베이스에 없는 필드
     appearanceConditions: "", // 데이터베이스에 없는 필드
     occupationConditions: application?.ideal_occupation || "",
     idealMbti: "" // 데이터베이스에 없는 필드
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
