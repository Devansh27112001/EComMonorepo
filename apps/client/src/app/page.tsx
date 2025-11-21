import ProductList from "@/components/ProductList";
import Image from "next/image";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-4">
        <Image src={"/featured.png"} alt="featured_product" fill />
      </div>
      <ProductList category={category} params="homepage" />
    </div>
  );
};

export default Home;
