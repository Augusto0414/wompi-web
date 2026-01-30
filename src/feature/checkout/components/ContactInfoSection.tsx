import React from "react";
import type { CheckoutFormData } from "../../../types";

interface ContactInfoSectionProps {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  updateField: <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ formData, errors, updateField }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">1</span>
        Contact Information
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number</label>
            <input
              type="tel"
              placeholder="3001234567"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.phone ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
