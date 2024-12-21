"use client";
import Image from "next/image";
import Link from "next/link";
import tiktok from "../assets/tiktok-brands-solid.svg";
import instagram from "../assets/instagram-brands-solid.svg";
import gmail from "../assets/envelope-regular.svg";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`bg-neutral-900 absolute -bottom-full left-0 right-0 pt-4 flex-col gap-4 items-center mt-20 ${pathname !== "/login" ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="*:bg-white *:w-12 flex gap-12 justify-center">
          <div className="rounded-full p-3 flex justify-center items-center hover:-translate-y-2 transition-all duration-150">
            <Image alt="" src={tiktok} />
          </div>
          <div className="rounded-full p-3 flex items-center justify-center hover:-translate-y-2 transition-all duration-150">
            <Image alt="" src={instagram} />
          </div>
          <div className="rounded-full p-3 flex items-center justify-center hover:-translate-y-2 transition-all duration-150">
            <Image alt="" src={gmail} />
          </div>
        </div>
        <div className="flex gap-4 p-2 font-bold text-xl text-neutral-400 justify-center">
          <Link href={"/"}>Glavna Stranica</Link>
          <Link href={"/collections/all"}>Svi Proizvodi</Link>
          <Link href={"/cart"}>Korpa</Link>
        </div>
      </div>
      <div className="bg-black w-full h-max p-2 flex justify-center items-center">
        Copyright ©2024; Designed by LunarWeb
      </div>
    </footer>
  );
}
