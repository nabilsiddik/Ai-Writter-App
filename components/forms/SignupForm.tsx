"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/registerUser";
import InputFieldError from "../InputFieldError";
import ProfileUploader from "../ProfileUploader";

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LoadingSpinner } from "../shared/Spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={cn("flex flex-col px-5", className)}
      {...props}
    >
      {/* hidden input file for profile image  */}
      <input
        type="file"
        name="profileImage"
        ref={(el) => {
          if (el && profileImage) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(profileImage);
            el.files = dataTransfer.files;
          }
        }}
        hidden
      />

      {/* hidden input for date  */}
      <input name="birthDate" type="text" value={date?.toString() || ''} hidden/>

      <FieldGroup>
        <div className="flex items-center gap-5 flex-col md:flex-row">
          {/* First Name field  */}
          <Field>
            <FieldLabel htmlFor="first name">
              First Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
            />

            <InputFieldError field="firstName" state={state} />
          </Field>

          {/* Last Name field  */}
          <Field>
            <FieldLabel htmlFor="last name">
              Last Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />

            <InputFieldError field="lastName" state={state} />
          </Field>
        </div>


        {/* email field  */}
        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Your  Email"
          />

          <InputFieldError field="email" state={state} />
        </Field>

        {/* bio field  */}
        {/* <Field>
          <FieldLabel htmlFor="bio">Bio (optional)</FieldLabel>
          <Textarea name="bio" placeholder="Write a short bio." />

          <InputFieldError field="bio" state={state} />
        </Field> */}

        {/* <div className="flex flex-col md:flex-row gap-5">
          <Field>
            <FieldLabel htmlFor="email">
              Gender <span className="text-red-500">*</span>
            </FieldLabel>
            <Select name="gender">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHERS">Others</SelectItem>
              </SelectContent>
            </Select>
            <InputFieldError field="gender" state={state} />
          </Field>
        </div> */}

        {/* current location field  */}
        {/* <Field>
          <FieldLabel htmlFor="currentLocation">
            Current Location (optional)
          </FieldLabel>
          <Input
            name="currentLocation"
            id="currentLocation"
            type="text"
            placeholder="Your Current Location"
          />

          <InputFieldError field="name" state={state} />
        </Field> */}

        {/* <Field>
          <CountrySelectInput countries={countries} />
        </Field>

        <Field>
          <InterestSelectInput interests={interests} />
        </Field> */}

        <div className="flex items-center flex-col md:flex-row gap-5">
          {/* password field  */}
          <Field>
            <FieldLabel htmlFor="password">
              Password<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Type Secure password"
            />

            <InputFieldError field="password" state={state} />
          </Field>

          {/* confirm password  */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <div>
          <Field>
            <FieldLabel htmlFor="date" className="px-1">
              Date of birth (You must be 18+) <span className="text-red-500">*</span>
            </FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type='button'
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            <InputFieldError field="birthDate" state={state} />
          </Field>
        </div>

        <div>
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Profile Photo
            </FieldLabel>
            <ProfileUploader setProfileImage={setProfileImage} />
          </Field>
        </div>

        <Field>
          <Button className="py-5 text-lg cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? <span className="flex items-center gap-3"><LoadingSpinner /> Creating ...</span> : "Create Account"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={"/login"}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
