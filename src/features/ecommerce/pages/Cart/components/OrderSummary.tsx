import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  taxAmount: number;
  total: number;
  isDisableCheckout: boolean;
  onCheckoutClick?: () => void;
}

export const OrderSummary = ({
  subtotal,
  taxAmount,
  total,
  isDisableCheckout,
  onCheckoutClick,
}: OrderSummaryProps) => {
  return (
    <div className="w-full lg:w-[40%] border border-gray-200 rounded-[20px] p-6 bg-white sticky top-6">
      <h2 className="font-bold text-xl sm:text-2xl mb-6 text-black">
        Order Summary
      </h2>

      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">VAT / Tax (14%)</span>
          <span className="font-bold text-black">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="font-bold text-green-600">Free</span>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="flex justify-between items-center text-base sm:text-xl font-bold">
          <span>Total</span>
          <span className="text-black">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full mt-5 rounded-full py-4"
        disabled={isDisableCheckout}
        onClick={onCheckoutClick}
      >
        Go to Checkout <ArrowRight />
      </Button>
    </div>
  );
};
