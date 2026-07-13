"use client";

import { bkashPayment, subscribeToPlan } from "@/services/subscription";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  CreditCard,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const inputStyles =
  "w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-5 text-xl text-black placeholder:text-slate-500 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/5 transition-all duration-300";
const labelStyles = "text-lg font-black mb-4 block ml-1";

export default function PricingSection({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
  const [isBkash, setIsBkash] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"BKASH">();
  const [selectedSubscription, setSelectedSubscription] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [plan, setPlan] = useState<"STARTAR" | "PREMIUM">();
  const router = useRouter();

  const [formData, setFormData] = useState({
    bkashNumber: "",
    transactionId: "",
  });

  const handleBkashPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Payment processing...");
    const payload = {
      bkashNumber: formData?.bkashNumber,
      transactionId: formData?.transactionId,
      planName: plan,
    };

    try {
      const res = await bkashPayment(payload);

      if (res?.success) {
        toast.success(
          "Your payment is completed. We will check and inform you through call or whats app.",
          { id: toastId },
        );
        setIsBkash(false);
        setPaymentMethodModalOpen(false);
      } else {
        toast.error(res?.message || "Bkash Payment Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Connection error while bkash payment. Please try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      plan: "FREE",
      description: "Perfect For Testing.",
      limit: "5 Product Import Export from Daraz, Amazon, Aliexpress",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
      ],
      buttonText: user?.plan === "FREE" ? "Current Plan" : "Get Started",
      isPopular: false,
    },
    {
      name: "Starter",
      price: 150,
      plan: "STARTAR",
      description: "The ideal choice for active students.",
      limit: "50 Product Import Export from Daraz, Amazon, Aliexpress",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
        "Priority Processing",
      ],
      buttonText: user?.plan === "STARTAR" ? "Current Plan" : "Choose Starter",
      isPopular: true,
    },
    {
      name: "Premium",
      price: 299,
      plan: "PREMIUM",
      description: "Unlimited power for high achievers.",
      limit: "100 Product Import Export from Daraz, Amazon, Aliexpress",
      features: [
        "AI Content Generation",
        "Export as PDF",
        "Open in Google Docs",
        "Export in Word file",
        "Save to Google Drive",
        "Early Access to New Tools",
        "24/7 Premium Support",
      ],
      buttonText: user?.plan === "PREMIUM" ? "Current Plan" : "Get Premium Pro",
      isPopular: false,
    },
  ];

  const handleSubscription = async (plan: "STARTAR" | "PREMIUM") => {
    let priceId = "";
    if (plan === "STARTAR") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!;
    } else if (plan === "PREMIUM") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!;
    }

    try {
      const res = await subscribeToPlan(priceId);
      if (res?.success && res?.data) {
        router.push(res?.data);
      } else {
        toast.error("Subscription failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-primary font-bold mb-4"
          >
            <ShieldCheck size={20} />
            Secure payments via Stripe
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Simple and transparent pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                plan.isPopular
                  ? "border-primary shadow-xl"
                  : "border-slate-200 shadow-sm"
              } bg-white transition-shadow hover:shadow-md`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-base font-bold flex items-center gap-1">
                  <Star size={16} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-black mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 min-h-[50px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black text-black">
                    ৳{plan.price}
                  </span>
                  <span className="text-slate-500 text-lg">/month</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-black font-bold">
                  <Zap size={30} className="text-primary" /> {plan.limit}
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 text-green-600 rounded-full p-0.5">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {user?.id ? (
                <button
                  disabled={plan.plan === "FREE" || user?.plan === plan.plan}
                  onClick={() => {
                    setPaymentMethodModalOpen(true);
                    setPlan((plan?.plan as "STARTAR") || "PREMIUM");
                    setAmount(plan?.price)
                  }}
                  className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? "bg-primary text-white hover:bg-indigo-700 shadow-lg shadow-primary/20"
                      : "bg-slate-100 text-black hover:bg-slate-200"
                  } disabled:opacity-50 disabled:cursor-default`}
                >
                  {plan.buttonText}
                  {user?.plan !== plan.plan && <ArrowRight size={20} />}
                </button>
              ) : (
                <Link href={"/login"} target="_blank">
                  <button
                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.isPopular
                        ? "bg-primary text-white hover:bg-indigo-700 shadow-lg shadow-primary/20"
                        : "bg-slate-100 text-black hover:bg-slate-200"
                    } disabled:opacity-50 disabled:cursor-default`}
                  >
                    {plan.buttonText}
                    {user?.plan !== plan.plan && <ArrowRight size={20} />}
                  </button>
                </Link>
              )}
            </motion.div>
          ))}

          {paymentMethodModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPaymentMethodModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 lg:p-12 shadow-2xl overflow-hidden text-center"
              >
                {isBkash ? (
                  <form
                    onSubmit={handleBkashPayment}
                    className="bg-white border border-slate-200 rounded-[40px] shadow-sm space-y-12 p-5"
                  >
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mb-6">
                        <ShoppingBag size={40} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                        Bkash Payment
                      </h2>
                      <p className="text-xl text-slate-500 mt-3 mb-5">
                        {`Send Money ${amount} Taka to this Bkash Personal Number`}{" "}
                        <span className="font-bold text-black">
                          01957282230
                        </span>{" "}
                        and then provide your Bkash number and transaction ID. I
                        will verify and approve it instantly and your
                        subscription will be active. Contact directly to
                        whatsapp chat for any inquiry. <span className="text-green-700 font-bold underline"><Link target="_blank" href={'https://wa.me/8801957282230?text=Hello!%20I%20need%20help%20and%20support.'}>Whatsapp Me</Link></span>
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="mb-4">
                        <input
                          required
                          className={inputStyles}
                          placeholder="Your Bkash Number"
                          value={formData.bkashNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bkashNumber: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <input
                          required
                          className={inputStyles}
                          placeholder="Transaction ID"
                          value={formData.transactionId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              transactionId: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full py-5 bg-[rgb(226,19,110)] hover:bg-[rgb(326,19,110)] text-white rounded-2xl text-xl font-black transition-all flex items-center justify-center gap-4 cursor-pointer disabled:opacity-50 disabled:cursor-default"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <span>Complete Payment</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div>
                    <CreditCard
                      size={44}
                      className="flex justify-center w-full mb-5"
                    />
                    <h2 className="text-3xl font-black mb-4">
                      Select Payment Method
                    </h2>
                    <p className="text-slate-500 text-xl leading-relaxed mb-10">
                      Select in between Stripe or Bkash payment method to
                      complete the subscription process.
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                      <button
                        // onClick={() =>
                        //   handleSubscription(plan as "STARTAR" | "PREMIUM")
                        // }
                        className="w-full py-5 bg-[rgb(98,90,250)] text-white rounded-xl font-bold text-xl hover:bg-indigo-700 transition-all cursor-pointer"
                      >
                        Stripe
                      </button>
                      <button
                        onClick={() => setIsBkash(true)}
                        className="w-full py-5 bg-[rgb(226,19,110)] text-white rounded-xl font-bold text-xl hover:bg-[rgb(326,19,110)] transition-all cursor-pointer"
                      >
                        Bkash
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-slate-100 pt-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">Instant Activation</h4>
              <p className="text-slate-500">
                Get access immediately after payment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">Secure Checkout</h4>
              <p className="text-slate-500">
                Encrypted transactions via Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
