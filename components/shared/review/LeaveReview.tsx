"use client";

import { useState } from "react";
import { serverFetch } from "@/lib/serverFetch";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function LeaveReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // if (!rating) return toast.error("Please select a rating");
    // setLoading(true);
    // try {
    //   const res = await serverFetch.post("/reviews", { planId, targetUserId, rating, comment });
    //   if (!res.ok) throw new Error("Failed to submit review");
    //   toast.success("Review submitted!");
    //   setComment("");
    //   setRating(0);
    // } catch (err: any) {
    //   toast.error(err.message || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full mx-auto mt-10">
      <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>

      <div className="flex gap-2 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 cursor-pointer ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(i + 1)}
          />
        ))}
      </div>

      <textarea
        className="w-full border rounded-md p-2 mb-4"
        rows={4}
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button onClick={submit} disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
