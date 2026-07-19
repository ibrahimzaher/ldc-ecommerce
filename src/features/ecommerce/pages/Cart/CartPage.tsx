import { useAppSelector } from "@/core/store/store";
import { CartItem } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import { useAddOrder } from "../../hooks/useOrders";

export const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const customerId = useAppSelector((state) => state.auth.user?.id || "");
  const { mutate, isPending } = useAddOrder();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.amount * item.quantity,
    0,
  );
  const taxRate = 0.14;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleCheckout = () => {
    mutate({
      customerId,
      orderItems: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Your cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[60%] border border-gray-200 rounded-[20px] p-4 md:p-6 bg-white space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={item.product.id}>
                <CartItem item={item} />
                {index !== cartItems.length - 1 && (
                  <hr className="border-gray-100 my-4" />
                )}
              </div>
            ))
          )}
        </div>

        <OrderSummary
          subtotal={subtotal}
          taxAmount={taxAmount}
          total={total}
          loading={isPending}
          isDisableCheckout={cartItems.length === 0}
          onCheckoutClick={handleCheckout}
        />
      </div>
    </>
  );
};
