import { useState } from "react";
import type { CartItem, CheckoutFormData, Transaction } from "../../../types";
import { checkoutService } from "../services/checkoutService";

export type PaymentStatus = "idle" | "processing" | "success" | "error";
export type PaymentStep =
  | "idle"
  | "getting-token"
  | "tokenizing-card"
  | "creating-customer"
  | "creating-transaction"
  | "creating-delivery"
  | "processing-payment"
  | "completed";

interface UsePaymentResult {
  status: PaymentStatus;
  step: PaymentStep;
  error: string | null;
  transaction: Transaction | null;
  processPayment: (formData: CheckoutFormData, items: CartItem[]) => Promise<boolean>;
  reset: () => void;
}

export const usePayment = (): UsePaymentResult => {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [step, setStep] = useState<PaymentStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const processPayment = async (formData: CheckoutFormData, items: CartItem[]): Promise<boolean> => {
    setStatus("processing");
    setError(null);

    try {

      setStep("getting-token");
      await checkoutService.getAcceptanceToken();


      setStep("tokenizing-card");
      const [expMonth, expYear] = formData.expiryDate.split(" / ");

      const tokenResponse = await checkoutService.tokenizeCard({
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        expMonth: expMonth.trim(),
        expYear: expYear.trim(),
        cvc: formData.cvc,
        cardHolder: formData.cardHolder,
      });

      const cardToken = tokenResponse.data.tokenId;


      setStep("creating-customer");
      const customer = await checkoutService.createCustomer({
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
      });


      let finalTransaction: Transaction | null = null;

      for (const item of items) {

        setStep("creating-transaction");
        const txn = await checkoutService.createTransaction({
          productId: item.id,
          customerId: customer.id,
          shippingCost: 8000,
        });


        setStep("processing-payment");
        finalTransaction = await checkoutService.payTransaction(txn.id, {
          cardToken,
        });


        if (finalTransaction.status === "DECLINED") {
          throw new Error("Your payment was declined. Please check your card details and try again.");
        }

        if (finalTransaction.status === "ERROR") {
          throw new Error("An error occurred processing your payment. Please try again.");
        }


        setStep("creating-delivery");
        await checkoutService.createDelivery({
          transactionId: txn.id,
          customerId: customer.id,
          address: formData.address,
          city: formData.city,
          department: formData.department,
          zipCode: formData.zipCode,
          instructions: formData.instructions,
        });
      }

      setTransaction(finalTransaction);
      setStep("completed");
      setStatus("success");
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setError(errorMessage);
      setStatus("error");
      setStep("idle");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setStep("idle");
    setError(null);
    setTransaction(null);
  };

  return {
    status,
    step,
    error,
    transaction,
    processPayment,
    reset,
  };
};
