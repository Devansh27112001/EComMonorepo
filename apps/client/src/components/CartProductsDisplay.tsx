import useCartStore from "@/stores/cartStore";
import { CartItemDataType } from "@/utils/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";

const CartProductsDisplay = ({
  cartProducts,
}: {
  cartProducts: CartItemDataType[];
}) => {
  const { removeFromCart } = useCartStore();
  return (
    <>
      {cartProducts.map((product) => (
        // SINGLE CART ITEM CONTAINER
        <div
          key={product.id + product.selectedColor + product.selectedSize}
          className="flex items-center justify-between"
        >
          {/* IMAGE AND DETAILS */}
          <div className="flex gap-8">
            {/* IMAGE */}
            <div className="relative size-32 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[product.selectedColor] || ""}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            {/* DETAILS */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">
                  Quantity: {product.quantity}
                </p>
                <p className="text-xs text-gray-500">
                  Size: {product.selectedSize}
                </p>
                <p className="text-xs text-gray-500">
                  Color: {product.selectedColor}
                </p>
              </div>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
          </div>
          {/* DELETE BUTTON */}
          <button
            onClick={() => removeFromCart(product)}
            className="size-8 rounded-full hover:bg-red-200 transition-all duration-200 bg-red-100 text-red-400 flex items-center justify-center cursor-pointer"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </>
  );
};

export default CartProductsDisplay;
