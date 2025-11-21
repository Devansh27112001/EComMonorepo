"use client";

import useCartStore from "@/stores/cartStore";
import { ProductDataType } from "@/utils/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const ProductInteration = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductDataType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, selectedSize, quantity });
    toast.success("Added to cart successfully");
  };
  return (
    <div className="flex flex-col gap-4">
      {/* SIZE */}
      <div className="flex flex-col gap-1 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {(product.sizes as string[]).map((size) => (
            <div
              className={`cursor-pointer border p-0.5 ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`size-6 text-center flex items-center justify-center uppercase ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "text-black bg-white"
                }`}
              >
                {size}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {(product.colors as string[]).map((color) => (
            <div
              className={`cursor-pointer border p-0.5 ${
                selectedColor === color ? "border-gray-300" : "border-white"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className={`size-6`}
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-400 p-1"
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            <Minus className="size-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-400 p-1"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={() => handleAddToCart()}
        className=" font-medium flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg justify-center cursor-pointer"
      >
        <Plus className="size-4" />
        Add to Cart
      </button>
      <button className=" cursor-pointer font-medium ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2">
        <ShoppingCart className="size-4" />
        Buy this Item
      </button>
    </div>
  );
};
