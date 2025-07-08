
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
          <Select onValueChange={(value) => onInputChange("gender", value)} required>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-rosegold-200 focus:border-rosegold-400",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birthDate ? format(formData.birthDate, "PPP") : "생년월일을 선택하세요"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.birthDate}
                onSelect={(date) => onInputChange("birthDate", date)}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
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
            연락처 *
          </label>
          <Input
            placeholder="010-0000-0000"
            value={formData.contact}
            onChange={(e) => onInputChange("contact", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
