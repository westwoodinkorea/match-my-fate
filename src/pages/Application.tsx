
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { User, Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import BasicInfoSection from "@/components/forms/BasicInfoSection";
import BackgroundInfoSection from "@/components/forms/BackgroundInfoSection";
import LifestyleSection from "@/components/forms/LifestyleSection";
import IdealTypeSection from "@/components/forms/IdealTypeSection";
import ApplicationHeader from "@/components/ApplicationHeader";
import ApplicationActions from "@/components/ApplicationActions";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { useApplicationState } from "@/hooks/useApplicationState";

interface ApplicationProps {
  user: User | null;
  session: Session | null;
}

const Application = ({ user, session }: ApplicationProps) => {
  const { formData, handleInputChange, handlePersonalityKeywordChange, setFormDataFromApplication } = useApplicationForm();
  const { 
    isLoading, 
    existingApplication, 
    isEditMode, 
    showExistingApplicationDialog,
    submitApplication,
    handleEditApplication,
    handleGoToMatching,
    setShowExistingApplicationDialog
  } = useApplicationState(user);

  // 기존 신청서 데이터로 폼 설정
  useEffect(() => {
    if (existingApplication && user) {
      setFormDataFromApplication(existingApplication, user.email || "");
    }
  }, [existingApplication, user, setFormDataFromApplication]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitApplication(formData);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="shadow-elegant">
              <ApplicationHeader isEditMode={isEditMode} />
              
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
                  
                  <ApplicationActions isLoading={isLoading} isEditMode={isEditMode} />
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showExistingApplicationDialog} onOpenChange={setShowExistingApplicationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>신청서가 이미 제출되었습니다</AlertDialogTitle>
            <AlertDialogDescription>
              이미 제출된 신청서가 있습니다. 어떻게 하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleGoToMatching}>
              매칭 페이지로 이동
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleEditApplication}>
              정보 수정하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Application;
