"use client";
import { auth } from "../db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function UserCheck() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (pathname === "/login" && user) {
        router.push("/");
      }
      if (pathname !== "login" && !user) {
        router.push("/login");
      }
    });
  }, []);
  return <div></div>;
}
