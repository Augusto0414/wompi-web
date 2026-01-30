import { useState } from "react";
import type { CartItem, CheckoutFormData, Transaction } from "../../../types";
import { checkoutService } from "../services/checkoutService";

export type PaymentStatus = "idle" | "processing" | "success" | "error";

interface UsePaymentResult {
  status: PaymentStatus;
  error: string | null;
  transaction: Transaction | null;
  processPayment: (formData: CheckoutFormData, items: CartItem[]) => Promise<boolean>;
  reset: () => void;
}

export const usePayment = (): UsePaymentResult => {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const processPayment = async (formData: CheckoutFormData, items: CartItem[]): Promise<boolean> => {
    setStatus("processing");
    setError(null);

    try {
      // Step 1: Get acceptance token
      const { acceptanceToken } = await checkoutService.getAcceptanceToken();

      // Step 2: Parse expiry date
      const [expMonth, expYear] = formData.expiryDate.split(" / ");

      // Step 3: Tokenize card
      const tokenResponse = await checkoutService.tokenizeCard({
        number: formData.cardNumber.replace(/\s/g, ""),
        expMonth: expMonth,
        expYear: `20${expYear}`,
        cvc: formData.cvc,
        cardHolder: formData.cardHolder,
      });

      const cardToken = tokenResponse.data.id;

      // Step 4: Create customer
      const customer = await checkoutService.createCustomer({
        email: formData.email,
        fullName: formData.fullName,
        legalIdType: formData.legalIdType,
        legalId: formData.legalId,
        phoneNumber: formData.phoneNumber,
      });

      // Step 5: Create transactions for each item and process payment
      // For simplicity, we'll create one transaction per item
      let finalTransaction: Transaction | null = null;

      for (const item of items) {
        // Create transaction
        const txn = await checkoutService.createTransaction({
          productId: item.id,
          customerId: customer.id,
          quantity: item.quantity,
        });

        // Create delivery info
        await checkoutService.createDelivery({
          transactionId: txn.id,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          region: formData.region,
          country: "CO",
          postalCode: formData.postalCode,
          phoneNumber: formData.phoneNumber,
        });

        // Process payment
        finalTransaction = await checkoutService.payTransaction(txn.id, {
          cardToken,
          acceptanceToken,
          installments: formData.installments,
        });

        // Check if payment was declined
        if (finalTransaction.status === "DECLINED" || finalTransaction.status === "ERROR") {
          throw new Error(`Payment failed: ${finalTransaction.status}`);
        }
      }

      setTransaction(finalTransaction);
      setStatus("success");
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setError(errorMessage);
      setStatus("error");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setTransaction(null);
  };

  return {
    status,
    error,
    transaction,
    processPayment,
    reset,
  };
};
