import React from "react";
import type { CheckoutFormData } from "../../../types";

interface ShippingAddressSectionProps {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  updateField: <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => void;
}

export const ShippingAddressSection: React.FC<ShippingAddressSectionProps> = ({ formData, errors, updateField }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">2</span>
        Shipping Address
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</label>
          <input
            type="text"
            placeholder="Calle 123 #45-67"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.address ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City</label>
          <input
            type="text"
            placeholder="Bogotá"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.city ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</label>
          <input
            type="text"
            placeholder="Cundinamarca"
            value={formData.department}
            onChange={(e) => updateField("department", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.department ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Zip Code</label>
          <input
            type="text"
            placeholder="110111"
            value={formData.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.zipCode ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Instructions (Optional)</label>
          <input
            type="text"
            placeholder="Leave at reception"
            value={formData.instructions || ""}
            onChange={(e) => updateField("instructions", e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
