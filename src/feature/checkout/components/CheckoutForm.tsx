import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCart, selectCartItems } from "../../cart/store/cartSlice";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { usePayment, type PaymentStep } from "../hooks/usePayment";
import { ContactInfoSection } from "./ContactInfoSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { PaymentInfoSection } from "./PaymentInfoSection";
import { PaymentReceipt } from "./PaymentReceipt";
import { ShippingAddressSection } from "./ShippingAddressSection";

const getStepLabel = (step: PaymentStep): string => {
  const labels: Record<PaymentStep, string> = {
    idle: "",
    "getting-token": "Getting authorization...",
    "tokenizing-card": "Securing card data...",
    "creating-customer": "Creating customer profile...",
    "creating-transaction": "Creating transaction...",
    "creating-delivery": "Saving delivery info...",
    "processing-payment": "Processing payment...",
    completed: "Payment completed!",
  };
  return labels[step];
};

export const CheckoutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const { formData, errors, updateField, validateForm, resetForm } = useCheckoutForm();
  const { status, step, error, transaction, processPayment, reset: resetPayment } = usePayment();

  const isLoading = status === "processing";

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Button onClick={() => navigate("/")}>Go Shopping</Button>
      </div>
    );
  }

    const handlePlaceOrder = async (e: React.MouseEvent) => {
    e.preventDefault();


    if (!validateForm()) {
      return;
    }


    await processPayment(formData, items);
  };

  const handleReceiptFinished = () => {
    dispatch(clearCart());
    resetForm();
    resetPayment();
    navigate("/");
  };

  if (status === "success") {
    return (
      <PaymentReceipt 
        transaction={transaction}
        items={items}
        onFinished={handleReceiptFinished}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <ContactInfoSection formData={formData} errors={errors} updateField={updateField} />
        <ShippingAddressSection formData={formData} errors={errors} updateField={updateField} />
        <PaymentInfoSection formData={formData} errors={errors} updateField={updateField} />


        {isLoading && step !== "idle" && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600"></div>
              <p className="text-indigo-700 font-medium">{getStepLabel(step)}</p>
            </div>
          </div>
        )}


        {status === "error" && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 font-medium">Payment Failed</p>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button onClick={resetPayment} className="text-red-700 underline text-sm mt-2">
              Try again
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <OrderSummarySection onPlaceOrder={handlePlaceOrder} isLoading={isLoading} />
      </div>
    </div>
  );
};
