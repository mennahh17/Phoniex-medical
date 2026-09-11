import Link from "next/link";
import Image from "next/image";
import {Search , User , ShoppingBag} from "lucide-react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Header() {
  return (
    <header className="border-t-2 border-white-600">
      <div className="flex items-center justify-between px-7 py-5">
        <div className="flex items-center gap-1">
          <Image
            src="/img/Gemini_Generated_Image_eqiwvxeqiwvxeqiw-removebg-preview.png"
            alt="Phoenix Medical logo"
            width={80}
            height={80}
            priority
          />
          <span className="font-bold font-bad-script text-xl text-blue-900">
            Phoenix Medical
          </span>
        </div>

        <nav className="flex justify-center items-center gap-10">
          <Link href="/" className="font-bold text-blue-900">
            Home
          </Link>
          <Link href="/About" className="font-bold text-blue-900">
            About
          </Link>
          <Link href="/Category/Product" className="font-bold text-blue-900">
            Products
          </Link>
          </nav>

          <div className="flex items-center justify-end gap-4 ">
          <Link href="/Search">
          <Search className="w-5 h-5 cursor-pointer text-blue-900  " />
          </Link>
          <Link href="/Cart">
          <ShoppingBag className="w-5 h-5 cursor-pointer text-blue-900"/>
          </Link>
          

          <LoginLink className="text-blue-900">Sign in</LoginLink>

          <RegisterLink className="text-blue-900">Sign up</RegisterLink>
          </div>

        
      </div>
    </header>
  );
}