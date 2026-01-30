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
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address Line 1</label>
          <input
            type="text"
            placeholder="Street address"
            value={formData.addressLine1}
            onChange={(e) => updateField("addressLine1", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.addressLine1 ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.addressLine1 && <p className="text-red-500 text-xs">{errors.addressLine1}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            placeholder="Apartment, suite, unit, etc."
            value={formData.addressLine2 || ""}
            onChange={(e) => updateField("addressLine2", e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
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
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Region / Department</label>
          <input
            type="text"
            placeholder="Cundinamarca"
            value={formData.region}
            onChange={(e) => updateField("region", e.target.value)}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.region ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.region && <p className="text-red-500 text-xs">{errors.region}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Postal Code (Optional)</label>
          <input
            type="text"
            placeholder="110111"
            value={formData.postalCode || ""}
            onChange={(e) => updateField("postalCode", e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
