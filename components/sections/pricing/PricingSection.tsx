"use client";

import { subscribeToPlan } from "@/services/subscription";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PricingSection({ user }: { user: any }) {
  const router = useRouter();
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      plan: "FREE",
      description: "Perfect for a quick assignment trial.",
      limit: "2 AI Generations per day",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
      ],
      buttonText:
        user && user?.plan === "FREE" ? "Current Plan" : "Free For You",
      accent: "from-gray-500 to-slate-800",
      icon: <Sparkles className="text-gray-400" size={32} />,
      popular: false,
    },
    {
      name: "Starter",
      price: "50",
      plan: "STARTAR",
      description: "The ideal choice for active students.",
      limit: "10 AI Generations per day",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
        "Priority Processing",
      ],
      buttonText:
        user && user?.plan === "STARTAR"
          ? "Current Plan"
          : "Upgrade to Starter",
      accent: "from-indigo-600 to-blue-500",
      icon: <Zap className="text-indigo-400" size={32} />,
      popular: true,
    },
    {
      name: "Premium",
      price: "80",
      plan: "PREMIUM",
      description: "Unlimited power for high achievers.",
      limit: "30 AI Generations per day",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
        "Early Access to New Tools",
        "24/7 Premium Support",
      ],
      buttonText:
        user && user?.plan === "PREMIUM" ? "Current Plan" : "Get Premium Pro",
      accent: "from-purple-600 to-pink-500",
      icon: <Crown className="text-purple-400" size={32} />,
      popular: false,
    },
  ];

  const handleSubscription = async (plan: "STARTAR" | "PREMIUM") => {
    if (!plan) {
      toast.error("No plan selected");
    }

    let priceId = "";
    if (plan === "STARTAR") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!;
    } else if (plan === "PREMIUM") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!;
    }

    try {
      const res = await subscribeToPlan(priceId as string);
      console.log(res, "sub res");

      if (res?.success && res?.data) {
        router.push(res?.data);
      } else {
        toast.error("Subscription Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30 font-sans">
      {/* Background Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
          >
            <ShieldCheck size={18} className="text-indigo-400" />
            <span className="text-base font-black tracking-widest uppercase text-indigo-400">
              Secure Billing & Subscriptions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
          >
            Invest in Your <br /> Academic Success.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-2xl leading-relaxed"
          >
            Transparent pricing designed for students. Unlock the full potential
            of AI document engineering.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {pricingPlans?.map((plan, index) => {
            return (
              <motion.div
                key={plan?.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative group flex flex-col bg-white/[0.02] border ${plan?.popular ? "border-indigo-500/50 shadow-[0_0_50px_rgba(79,70,229,0.2)]" : "border-white/10"} rounded-[50px] p-8 md:p-8 md:py-10 backdrop-blur-3xl transition-all duration-500`}
              >
                {plan?.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-indigo-600 text-white text-base font-black uppercase tracking-widest rounded-full shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-10 flex items-center gap-5">
                  <div className="w-20 h-20 bg-white/5 rounded-[28px] flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {plan?.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-3">{plan?.name}</h3>
                    <p className="text-gray-500 text-xl leading-relaxed">
                      {plan?.description}
                    </p>
                  </div>
                </div>

                <div className="mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black">৳{plan?.price}</span>
                    <span className="text-gray-500 text-xl font-bold">
                      / month
                    </span>
                  </div>
                  <div className="mt-6 py-3 px-6 bg-white/5 border border-white/5 rounded-2xl inline-block text-indigo-400 font-bold text-lg">
                    {plan?.limit}
                  </div>
                </div>

                <div className="flex-1 space-y-6 mb-12">
                  {plan?.features?.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4 text-gray-300 text-lg group/item"
                    >
                      <div
                        className={`p-1 rounded-full bg-gradient-to-br ${plan?.accent} bg-opacity-20 group-hover/item:scale-125 transition-transform`}
                      >
                        <Check size={18} className="text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={plan?.plan === "FREE"}
                  onClick={() =>
                    handleSubscription(plan?.plan as "STARTAR" | "PREMIUM")
                  }
                  className={`w-full py-6 rounded-[28px] text-xl font-black transition-all flex items-center justify-center gap-3 cursor-pointer ${
                    plan?.popular
                      ? "bg-white text-black hover:bg-indigo-600 hover:text-white"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {plan?.buttonText}
                  <ArrowRight size={22} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center p-12 bg-white/[0.01] border border-white/5 rounded-[50px]"
        >
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div>
              <h4 className="text-xl font-bold text-indigo-400 mb-4">
                Can I switch plans anytime?
              </h4>
              <p className="text-gray-500 text-lg">
                Yes, you can upgrade or downgrade your plan at any moment from
                your dashboard settings.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-indigo-400 mb-4">
                What happens to my data?
              </h4>
              <p className="text-gray-500 text-lg">
                Your generated documents are stored securely for 30 days on Free
                and forever on Premium plans.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
