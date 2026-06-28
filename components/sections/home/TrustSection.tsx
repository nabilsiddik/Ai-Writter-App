import { Users, FileCheck, Award } from "lucide-react";

export default function TrustStats() {
  return (
    <section className="bg-slate-50 py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-16 text-black">
          Best trusted online AI writer & formatter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">500+</div>
            <p className="text-xl text-slate-600 font-medium ">Documents Processed</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">98%</div>
            <p className="text-xl text-slate-600 font-medium ">Accuracy Rate</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">1000+</div>
            <p className="text-xl text-slate-600 font-medium">Daily active users</p>
          </div>
        </div>
      </div>
    </section>
  );
}