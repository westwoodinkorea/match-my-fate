import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ApplicationActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
}

const ApplicationActions = ({ isLoading, isEditMode }: ApplicationActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3 text-lg disabled:opacity-50"
      >
        {isLoading 
          ? (isEditMode ? "수정 중..." : "제출 중...") 
          : (isEditMode ? "정보 수정하기" : "신청서 제출하기")
        }
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      
      {isEditMode && (
        <Button 
          type="button"
          variant="outline"
          onClick={() => navigate("/matching")}
          className="w-full border-rosegold-300 text-rosegold-700 hover:bg-rosegold-50"
        >
          매칭 페이지로 돌아가기
        </Button>
      )}
    </div>
  );
};

export default ApplicationActions;