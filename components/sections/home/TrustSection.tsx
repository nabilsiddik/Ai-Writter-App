import { Users, FileCheck, Award } from "lucide-react";

export default function TrustStats({publicStats}: {
  publicStats: any
}) {

  return (
    <section className="bg-slate-50 py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">{publicStats?.documentsProcessed}+</div>
            <p className="text-xl text-slate-600 font-medium ">
              Documents Processed
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">{publicStats?.accuracyRate}%</div>
            <p className="text-xl text-slate-600 font-medium ">Accuracy Rate</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-black text-black">{publicStats?.totalCommunity
}+</div>
            <p className="text-xl text-slate-600 font-medium">
              Used by Users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
