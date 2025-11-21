"use client";

import { categories } from "@/utils/dummyData";
import { CategoryDataType } from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCat = searchParams.get("category");
  const pathname = usePathname();

  const handleChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", slug || "all");
    // When the navBar is not visible, and if we change the searchParams, it will scroll to top as a default behaviour. To avoid that, we use {scroll:false}
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-4 text-sm bg-gray-100 p-2 rounded-lg">
      {categories.map((category: CategoryDataType) => (
        <div
          key={category.name}
          className={`${
            category.slug === selectedCat ? `bg-white` : "text-gray-500"
          } flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md`}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
