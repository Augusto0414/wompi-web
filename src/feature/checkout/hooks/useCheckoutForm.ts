import { useState } from "react";
import type { CheckoutFormData } from "../../../types";

const initialFormData: CheckoutFormData = {
  email: "",
  fullName: "",
  legalIdType: "CC",
  legalId: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvc: "",
  installments: 1,
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
    if (!formData.legalId) {
      newErrors.legalId = "ID number is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    // Address validation
    if (!formData.addressLine1) {
      newErrors.addressLine1 = "Address is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.region) {
      newErrors.region = "Region is required";
    }

    // Payment validation
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Valid card number is required";
    }
    if (!formData.cardHolder) {
      newErrors.cardHolder = "Cardholder name is required";
    }
    if (!formData.expiryDate || formData.expiryDate.length < 7) {
      newErrors.expiryDate = "Valid expiry date is required";
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = "Valid CVC is required";
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
