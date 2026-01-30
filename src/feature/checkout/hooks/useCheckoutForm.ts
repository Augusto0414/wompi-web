import { useState } from "react";
import type { CheckoutFormData } from "../../../types";

const initialFormData: CheckoutFormData = {
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  department: "",
  zipCode: "",
  instructions: "",
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvc: "",
};

export const useCheckoutForm = () => {
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const updateField = <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    // Contact validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Customer validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phone || formData.phone.length < 7) {
      newErrors.phone = "Phone number is required (min 7 characters)";
    }

    // Address validation
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "Address is required (min 5 characters)";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.zipCode || formData.zipCode.length < 4) {
      newErrors.zipCode = "Zip code is required (min 4 characters)";
    }

    // Payment validation
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Valid card number is required (13-19 digits)";
    }
    if (!formData.cardHolder || formData.cardHolder.length < 2) {
      newErrors.cardHolder = "Cardholder name is required";
    }
    if (!formData.expiryDate || formData.expiryDate.length < 7) {
      newErrors.expiryDate = "Valid expiry date is required";
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = "Valid CVC is required (3-4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  };
};
