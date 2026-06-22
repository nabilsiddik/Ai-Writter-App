import { SignupForm } from "@/components/forms/SignupForm";
import SocialLogin from "@/components/shared/SocialLogin";

export default function SignupPage() {
  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="w-full max-w-xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="font-bold text-3xl text-center mb-2">Let’s Get Started</h2>
          <p>Create an account and get the Deals & Promotions news</p>
        </div>
        {/* social login  */}
        <SocialLogin />

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1"><hr /></span>
          <span>or</span>
          <span className="flex-1"><hr /></span>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}