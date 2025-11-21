import { PaymentFormInputs, paymentFormSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema as any),
  });
  const handlePaymentSubmit: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log(data);
  };
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs text-gray-500 font-medium"
        >
          Name on Card
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm focus:border-gray-400 transition-all duration-200"
          type="text"
          id="cardHolder"
          placeholder="Mike Doe"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-red-500 text-sm">{errors.cardHolder.message}</p>
        )}
        <label
          htmlFor="cardNumber"
          className="text-xs text-gray-500 font-medium"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm focus:border-gray-400 transition-all duration-200"
          type="text"
          id="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
        )}
        <label htmlFor="expiry" className="text-xs text-gray-500 font-medium">
          Expiration Date
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm focus:border-gray-400 transition-all duration-200"
          type="text"
          id="expiry"
          placeholder="MM/YY"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-red-500 text-sm">
            {errors.expirationDate.message}
          </p>
        )}
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm focus:border-gray-400 transition-all duration-200"
          type="text"
          id="cvv"
          placeholder="XXX"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-red-500 text-sm">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={"/klarna.png"}
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/stripe.png"}
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/cards.png"}
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-200"
      >
        Checkout <ShoppingCart className="size-3" />
      </button>
    </form>
  );
};

export default PaymentForm;
