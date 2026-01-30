import React from "react";
import { Button } from "../../../components/ui/Button";
import { formatPrice } from "../../../helpers/formatters";
import { useAppSelector } from "../../../store/hooks";
import { selectCartItems, selectCartTotalPrice } from "../../cart/store/cartSlice";

interface OrderSummarySectionProps {
  onPlaceOrder: (e: React.MouseEvent) => void;
  isLoading: boolean;
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ onPlaceOrder, isLoading }) => {
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 sticky top-24">
      <h2 className="text-lg font-bold mb-6 text-gray-900">Order Summary</h2>
      <ul className="space-y-6 mb-8 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-200 bg-white shrink-0">
              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</span>
                <span className="font-bold text-sm text-gray-900 ml-2">{formatPrice(item.price * item.quantity)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Qty: {item.quantity} × {formatPrice(item.price)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 pt-6 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
          <span>Total</span>
          <span className="text-xl">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <Button
        className="w-full mt-8 h-12 text-base shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all"
        size="lg"
        onClick={onPlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? "Processing Order..." : `Pay ${formatPrice(totalPrice)}`}
      </Button>

      <p className="text-xs text-center text-gray-400 mt-4">Secure Checkout powered by Wompi.</p>
    </div>
  );
};
