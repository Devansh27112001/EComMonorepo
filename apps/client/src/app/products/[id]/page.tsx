import { ProductInteration } from "@/components/ProductInteration";
import { tmpSingleProductData as product } from "@/utils/dummyData";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<{ title: string; description: string }> => {
  // TODO : Get the product from the id from the database
  return {
    title: product.name,
    description: product.description,
  };
};
const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const selectedSize =
    (await searchParams).size || (product.sizes[0] as string);

  const selectedColor =
    (await searchParams).color || (product.colors[0] as string);
  return (
    <div className="flex flex-col md:gap-8 lg:flex-row gap-4 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-3/4">
        <Image
          src={product.images?.[selectedColor] || ""}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* PRODUCT INFO */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="font-medium text-2xl">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteration
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
        {/* CARD INFO */}
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
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">
            Terms and Conditions
          </span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us and our payment service providers to share your
          information with our payment service providers, up to and including
          payment service providers who are authorized under applicable law to
          share such information with us for the purposes of fraud prevention.
          All sale are subject to return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
