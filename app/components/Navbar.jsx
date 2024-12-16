import Image from "next/image";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <main className="flex w-full justify-between py-2 lg:py-4 px-8 lg:px-12 items-center">
      <div>
        <Link
          href={"/"}
          className="h-full flex items-center justify-center text-2xl font-bold lg:text-4xl"
        >
          <h1>DripWear</h1>
        </Link>
      </div>
      <div>
        <Link href={"/cart"}>
          <Image src={cart} width={60} alt="" className="w-10" />
        </Link>
      </div>
    </main>
  );
}
