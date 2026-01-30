import React from "react";
import { CheckoutForm } from "../components/CheckoutForm";

export const CheckoutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
};
