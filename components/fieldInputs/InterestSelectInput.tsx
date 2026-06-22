import { useId } from "react";

import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";

export default function InterestSelectInput({interests}: {
  interests: string[]
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Your Visited Countries (optional, use Ctrl to select multiple)</Label>
      <div className="overflow-hidden rounded-md border border-input">
        <SelectNative name="interests" className="rounded-none border-none" id={id} multiple>
          {interests && interests.length > 0 && interests.map((interest: string, index: number) => {
            return <option key={index} value={interest}>{interest}</option>
          })}
        </SelectNative>
      </div>
    </div>
  );
}
