"use client";
import Image from "next/image";

import cart from "../assets/cart.png";
import menuImg from "../assets/menu.svg";
import dropdownImg from "../assets/dropdown.svg";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../db/firebase";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [userPhoto, setUserPhoto] = useState(null);
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserPhoto(user.photoURL);
        console.log(userPhoto);
      }
    });
  }, [userPhoto]);
  const logOut = () => {
    signOut(auth);
  };
  return (
    <main
      className={` ${pathname !== "/login" ? "flex" : "hidden"} w-full justify-between py-2 lg:py-4 px-8 lg:px-12 items-center z-40`}
    >
      <button onClick={() => setMenu(true)}>
        <Image src={menuImg} alt="" width={32} />
      </button>
      <div
        className={`absolute w-full h-screen bottom-0 left-0 backdrop-blur-sm flex ${menu ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200`}
      >
        <div className="flex flex-col w-max h-screen p-8 text-3xl justify-center gap-10 backdrop-brightness-50 backdrop-blur-lg">
          <Link
            href={"/collections/all"}
            className="transition-all duration-150 text-neutral-400 hover:text-white"
            onClick={() => setMenu(false)}
          >
            Sve
          </Link>
          <div className="">
            <div className="flex items-center justify-between w-full">
              <Link
                href={"/collections/clothes"}
                className="transition-all duration-150 text-neutral-400 hover:text-white"
                onClick={() => setMenu(false)}
              >
                <h1>Odeca</h1>{" "}
              </Link>
              <button onClick={() => setDropdown(!dropdown)}>
                <Image src={dropdownImg} alt="" width={20} />
              </button>
            </div>
            {dropdown && (
              <div className="flex flex-col ml-4 gap-4 mt-8 w-max">
                <Link
                  href={"/collections/clothes/shirts"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Majice
                </Link>
                <Link
                  href={"/collections/clothes/pants"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Donji Delovi
                </Link>
                <Link
                  href={"/collections/clothes/jackets"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Jakne
                </Link>
                <Link
                  href={"/collections/clothes/sets"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Kompleti
                </Link>
                <Link
                  href={"/collections/clothes/sweatshirts"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Duksevi
                </Link>
                <Link
                  href={"/collections/clothes/shoeses"}
                  className="transition-all duration-150 text-neutral-400 hover:text-white"
                  onClick={() => setMenu(false)}
                >
                  Patike
                </Link>
              </div>
            )}
          </div>
          <Link
            href={"/collections/fragrances"}
            className="transition-all duration-150 text-neutral-400 hover:text-white"
            onClick={() => setMenu(false)}
          >
            Parfemi
          </Link>
          <Link
            href={"/collections/headphones"}
            className="transition-all duration-150 text-neutral-400 hover:text-white"
            onClick={() => setMenu(false)}
          >
            Elektronika
          </Link>
          <Link
            href={"/collections/vapes"}
            className="transition-all duration-150 text-neutral-400 hover:text-white"
            onClick={() => setMenu(false)}
          >
            Vejpovi
          </Link>
          <Link
            href={"/collections/others"}
            className="transition-all duration-150 text-neutral-400 hover:text-white"
            onClick={() => setMenu(false)}
          >
            Ostalo
          </Link>
        </div>
        <button
          className="h-full w-full"
          onClick={() => {
            setMenu(false);
            setDropdown(false);
          }}
        ></button>
      </div>
      <div>
        <Link
          href={"/"}
          className="h-full flex items-center justify-center text-2xl font-bold lg:text-4xl"
        >
          <h1>DripWear.</h1>
        </Link>
      </div>
      <div className="flex flex-row-reverse items-center">
        <Link href={"/cart"} className="flex items-center ">
          <Image src={cart} alt="" className="w-12 " />
        </Link>
        {userPhoto && (
          <div className="w-full flex justify-center items-center relative">
            <img
              src={`${userPhoto}`}
              alt=""
              className="w-6/12 rounded-full cursor-pointer"
              onClick={() => setAccountMenu(!accountMenu)}
            />

            <button
              onClick={() => logOut()}
              className={`absolute -bottom-12 bg-red-500 text-black rounded-md ${accountMenu ? "scale-100" : "scale-0"} p-2 transition-all duration-150`}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
