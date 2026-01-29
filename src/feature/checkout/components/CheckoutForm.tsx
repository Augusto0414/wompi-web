import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCart, selectCartItems } from "../../cart/store/cartSlice";
import { ContactInfoSection } from "./ContactInfoSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { PaymentInfoSection } from "./PaymentInfoSection";
import { ShippingAddressSection } from "./ShippingAddressSection";

export const CheckoutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      dispatch(clearCart());
      alert("Order Placed Successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <ContactInfoSection />
        <ShippingAddressSection />
        <PaymentInfoSection />
      </div>

      <div className="lg:col-span-5">
        <OrderSummarySection onPlaceOrder={handlePlaceOrder} isLoading={isLoading} />
      </div>
    </div>
  );
};
