import { productsData } from "@/utils/dummyData";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import { ProductDataType } from "@/utils/types";
import Link from "next/link";
import Filter from "./Filter";

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-16">
        {productsData.map((product: ProductDataType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : `/products`}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all Products
      </Link>
    </div>
  );
};

export default ProductList;
