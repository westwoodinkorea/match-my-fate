
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface LifestyleSectionProps {
  formData: {
    smoking: string;
    drinking: string;
    religion: string;
    maritalStatus: string;
    hobbies: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const LifestyleSection = ({ formData, onInputChange }: LifestyleSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
        3. 생활 습관 및 가치관
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            흡연 여부 *
          </label>
          <Select onValueChange={(value) => onInputChange("smoking", value)} required>
            <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
              <SelectValue placeholder="흡연 여부를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smoker">흡연</SelectItem>
              <SelectItem value="non-smoker">비흡연</SelectItem>
              <SelectItem value="occasional">간헐적</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            음주 여부 *
          </label>
          <Select onValueChange={(value) => onInputChange("drinking", value)} required>
            <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
              <SelectValue placeholder="음주 여부를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="often">자주</SelectItem>
              <SelectItem value="sometimes">가끔</SelectItem>
              <SelectItem value="rarely">거의 안 함</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            종교
          </label>
          <Select onValueChange={(value) => onInputChange("religion", value)}>
            <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
              <SelectValue placeholder="종교를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="christian">기독교</SelectItem>
              <SelectItem value="catholic">천주교</SelectItem>
              <SelectItem value="buddhist">불교</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            결혼 경험 *
          </label>
          <Select onValueChange={(value) => onInputChange("maritalStatus", value)} required>
            <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
              <SelectValue placeholder="결혼 경험을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">미혼</SelectItem>
              <SelectItem value="divorced-no-children">돌싱-자녀 없음</SelectItem>
              <SelectItem value="divorced-with-children">돌싱-자녀 있음</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-bluegray-700 mb-2">
          취미
        </label>
        <Textarea
          placeholder="취미나 관심사를 자유롭게 적어주세요"
          value={formData.hobbies}
          onChange={(e) => onInputChange("hobbies", e.target.value)}
          className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
        />
      </div>
    </div>
  );
};

export default LifestyleSection;
