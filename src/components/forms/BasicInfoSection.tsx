
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  formData: {
    name: string;
    gender: string;
    birthDate: Date | undefined;
    residence: string;
    hometown: string;
    contact: string;
  };
  onInputChange: (field: string, value: string | Date | undefined) => void;
}

const BasicInfoSection = ({ formData, onInputChange }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
        1. 기본 정보
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            이름 *
          </label>
          <Input
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            성별 *
          </label>
          <Select value={formData.gender} onValueChange={(value) => onInputChange("gender", value)} required>
            <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
              <SelectValue placeholder="성별을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">남성</SelectItem>
              <SelectItem value="female">여성</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            생년월일 *
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Select 
              value={formData.birthDate?.getFullYear()?.toString()}
              onValueChange={(value) => {
                const year = parseInt(value);
                const month = formData.birthDate?.getMonth() || 0;
                const day = formData.birthDate?.getDate() || 1;
                onInputChange("birthDate", new Date(year, month, day));
              }}
            >
              <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                <SelectValue placeholder="연도" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 64 }, (_, i) => {
                  const year = new Date().getFullYear() - i - 18;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}년
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            <Select 
              value={formData.birthDate?.getMonth()?.toString()}
              onValueChange={(value) => {
                const year = formData.birthDate?.getFullYear() || new Date().getFullYear() - 25;
                const month = parseInt(value);
                const day = formData.birthDate?.getDate() || 1;
                onInputChange("birthDate", new Date(year, month, day));
              }}
            >
              <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                <SelectValue placeholder="월" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i + 1}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={formData.birthDate?.getDate()?.toString()}
              onValueChange={(value) => {
                const year = formData.birthDate?.getFullYear() || new Date().getFullYear() - 25;
                const month = formData.birthDate?.getMonth() || 0;
                const day = parseInt(value);
                onInputChange("birthDate", new Date(year, month, day));
              }}
            >
              <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                <SelectValue placeholder="일" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}일
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            거주지 (시/군/구) *
          </label>
          <Input
            placeholder="예: 서울 강남구"
            value={formData.residence}
            onChange={(e) => onInputChange("residence", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            출신 지역 (시)
          </label>
          <Input
            placeholder="예: 부산시"
            value={formData.hometown}
            onChange={(e) => onInputChange("hometown", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            연락처 (010-0000-0000 형태로 입력) *
          </label>
          <Input
            placeholder="010-0000-0000"
            value={formData.contact}
            onChange={(e) => {
              // 숫자와 하이픈만 허용
              const value = e.target.value.replace(/[^0-9-]/g, '');
              onInputChange("contact", value);
            }}
            className="border-rosegold-200 focus:border-rosegold-400"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
