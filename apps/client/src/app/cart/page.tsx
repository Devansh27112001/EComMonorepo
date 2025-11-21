"use client";
import CartProductsDisplay from "@/components/CartProductsDisplay";
import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { paymentSteps } from "@/utils/dummyData";
import { shippingFormInputs } from "@/utils/types";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingFormState, setShippingFormState] =
    useState<shippingFormInputs | null>(null);

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart } = useCartStore();
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-10">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {paymentSteps.map((step) => (
          <div
            className={`flex gap-2 items-center border-b-2 pb-4 ${
              activeStep === step.id ? "border-b-gray-800" : "border-b-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`size-6 rounded-full text-white p-4 flex items-center justify-center ${
                activeStep === step.id ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                activeStep === step.id ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS AND DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:justify-between">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-4">
          {activeStep === 1 ? (
            <CartProductsDisplay cartProducts={cart} />
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingFormState} />
          ) : activeStep === 3 && shippingFormState ? (
            <PaymentForm />
          ) : (
            <p className="font-semibold tracking-wide">
              Please fill in the shipping details in order to proceed to
              payment.
            </p>
          )}
        </div>

        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-4 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => item.price * item.quantity + acc, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium text-red-500">-$10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => item.price * item.quantity + acc, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push(`/cart?step=2`, { scroll: false })}
              className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-200"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
