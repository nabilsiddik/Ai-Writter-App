"use client";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { userLogin } from "@/services/auth/userLogin";
import InputFieldError from "../InputFieldError";
import { IInputErrorState } from "@/utils/getInputFieldError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function LoginForm({
  className,
  redirect,
  ...props
}: React.ComponentProps<"form"> & { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(userLogin, null);
  const router = useRouter();

  useEffect(() => {
    if (state && !state?.success && state?.message) {
      toast.error(state?.message);
    }
  }, [state]);

  // demo login 
  const submitDemoLogin = (type: "admin" | "user") => {
    const form = document.getElementById("login-form") as HTMLFormElement;
    const demoInput = form.querySelector(
      'input[name="demoType"]'
    ) as HTMLInputElement;

    demoInput.value = type;
    form.requestSubmit();
  };

  return (
    <form
      id="login-form"
      noValidate
      action={formAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      {/* hidden input for demo type  */}
      <input type="hidden" name="demoType" />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="m@example.com"
          />

          <InputFieldError field="email" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="Secure Password" />

          <InputFieldError field="password" state={state as IInputErrorState} />
        </Field>
        <Field>
          <Button type='submit' disabled={isPending} className="w-full py-2 cursor-pointer">
            {isPending ? "Proccessing" : "Login"}
          </Button>
        </Field>

        <div className="flex gap-5">
          <Field>
            <Button onClick={() => submitDemoLogin("admin")} type='button' disabled={isPending} className="w-full py-2 cursor-pointer bg-black">
              Demo Admin Login
            </Button>
          </Field>

          <Field>
            <Button onClick={() => submitDemoLogin("user")} type='button' disabled={isPending} className="w-full py-2 cursor-pointer bg-black">
              Demo User Login
            </Button>
          </Field>
        </div>
        <Field>
          <FieldDescription className="px-6 text-center">
            Don't have an account? <Link href={"/signup"}>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
