import { useId } from "react";

import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";

export default function CountrySelectInput({countries}: {
  countries: string[]
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Your Visited Countries (optional, use Ctrl to select multiple)</Label>
      <div className="overflow-hidden rounded-md border border-input">
        <SelectNative name="visitedCountries" className="rounded-none border-none" id={id} multiple>
          {countries && countries.length > 0 && countries.map((country: string, index: number) => {
            return <option key={index} value={country}>{country}</option>
          })}
        </SelectNative>
      </div>
    </div>
  );
}
