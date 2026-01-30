import React, { useEffect, useRef, useState } from "react";
import { type CartItem, type Transaction } from "../../../types";
import { generatePdf } from "../utils/pdfUtils";

interface PaymentReceiptProps {
  transaction: Transaction | null;
  items: CartItem[];
  onFinished: () => void;
}

import { styles } from "../utils/receiptStyles";

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  transaction,
  items,
  onFinished,
}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (timeLeft === 0) {
      onFinished();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinished]);

  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const fileName = `wompi-receipt-${transaction?.id || Date.now()}.pdf`;
      await generatePdf(receiptRef.current, fileName);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 w-full max-w-2xl mx-auto">
      <div
        ref={receiptRef}
        className="rounded-2xl shadow-xl overflow-hidden w-full border"
        style={{ ...styles.whiteBg, ...styles.borderGray100 }}
      >
        <div style={styles.baseColorBg} className="py-6 px-8 text-center">
          <div
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 animate-bounce"
            style={styles.whiteBg}
          >
            <svg
              className="h-10 w-10"
              style={styles.baseColorText}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold" style={styles.textWhite}>
            Payment Approved!
          </h2>
          <p className="font-medium mt-1" style={styles.textGray300}>
            Transaction Successful
          </p>
        </div>

        <div className="px-8 py-6">
          <div className="text-center mb-8">
            <p className="text-sm" style={styles.textGray500}>
              Total Amount
            </p>
            <p className="text-4xl font-bold mt-1" style={styles.textGray900}>
              {formatCurrency(totalAmount)}
            </p>
          </div>

          <div
            className="border-t border-b py-4 space-y-3"
            style={styles.borderGray100}
          >
            <div className="flex justify-between items-center text-sm">
              <span style={styles.textGray500}>Date</span>
              <span className="font-medium" style={styles.textGray900}>
                {currentDate}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span style={styles.textGray500}>Transaction ID</span>
              <span
                className="font-medium font-mono"
                style={styles.textGray900}
              >
                {transaction?.id || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span style={styles.textGray500}>Payment Status</span>
              <span
                className="font-medium px-2 py-0.5 rounded-full text-xs uppercase tracking-wide"
                style={styles.approvedBadge}
              >
                Approved
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p
              className="text-sm font-semibold mb-3"
              style={styles.textGray900}
            >
              Items
            </p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span
                      className="py-0.5 px-2 rounded-md text-xs font-medium mr-3"
                      style={styles.itemQuantity}
                    >
                      x{item.quantity}
                    </span>
                    <span
                      className="truncate max-w-[200px]"
                      style={styles.textGray700}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium" style={styles.textGray900}>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="px-8 py-6 text-center space-y-3"
          style={styles.gray50Bg}
          data-html2canvas-ignore="true"
        >
          <p className="mb-2" style={styles.textGray600}>
            Redirecting to home in{" "}
            <span className="font-bold" style={styles.baseColorText}>
              {timeLeft}
            </span>{" "}
            seconds...
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50"
              style={{
                ...styles.whiteBg,
                ...styles.baseColorBorder,
                ...styles.baseColorText,
              }}
            >
              {isGeneratingPdf ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>

            <button
              onClick={onFinished}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={styles.baseColorBg}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
