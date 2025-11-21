import z from "zod";

export interface ProductDataType {
  id: number | string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: [string, ...string[]];
  colors: [string, ...string[]];
  images: Record<string, string>;
}

export interface CategoryDataType {
  name: string;
  icon?: React.ReactNode;
  slug: string;
}

export interface StepDataType {
  title: string;
  id: number;
}

export interface CartItemDataType extends ProductDataType {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

// This is the schema of shipping form
export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

// This type represents the shape of shipping form inputs
// It is inferred from the shippingFormSchema validation schema
export type shippingFormInputs = z.infer<typeof shippingFormSchema>;

// This is the schema of the payment form
export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card Holder Name is required"),
  cardNumber: z
    .string()
    .min(16, "Invalid card number")
    .max(16, "Invalid card number")
    .regex(/^\d+$/, "Invalid card number"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration Date must be in MM/YY"),
  cvv: z
    .string()
    .min(3, "Invalid CVV")
    .max(3, "Invalid CVV")
    .regex(/^\d+$/, "Invalid CVV"),
});

// This type represents the shape of payment form inputs
// It is inferred from the paymentFormSchema validation schema
export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemDataType[];
  hasHydrated: boolean;
};

export type CartStoreActionType = {
  addToCart: (product: CartItemDataType) => void;
  removeFromCart: (product: CartItemDataType) => void;
  clearCart: () => void;
};
