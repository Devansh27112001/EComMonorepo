import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

export const Navbar = () => {
  return (
    <nav className="flex justify-between w-full border-b border-gray-200 pb-2">
      {/* LEFT SIDE */}
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="Website logo"
          height={36}
          width={36}
          className="w-6 h-6 md:size-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          TRENDDEV.
        </p>
      </Link>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        <Search />
        <Link href={"/"}>
          <Home className="size-4 text-gray-600" />
        </Link>
        <Bell className="size-4 text-gray-600" />
        <ShoppingCartIcon />
        <Link href={"/login"}>Sign in</Link>
      </div>
    </nav>
  );
};
