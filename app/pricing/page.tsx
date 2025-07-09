"use client";

import { PricingTable } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Choose Your Plan
        </h1>
        <PricingTable
          ctaPosition="bottom"
          collapseFeatures={false}
          newSubscriptionRedirectUrl="/dashboard"
          fallback={<div className="text-center py-8">Loading plans...</div>}
        />
      </div>
    </div>
  );
}
