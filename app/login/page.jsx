"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../db/firebase";
import { useRouter } from "next/navigation";
import google from "../assets/google.png";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      router.push("/");
    });
  };
  return (
    <main className="flex w-full h-full flex-grow items-center justify-center p-8">
      <div>
        <button
          onClick={googleLogin}
          className="flex gap text-2xl font-bold bg-neutral-900 p-4 items-center rounded-lg gap-4 hover:bg-neutral-800 transition-all duration-150"
        >
          <Image src={google} alt="" width={32} />
          <h1>Google</h1>
        </button>
      </div>
    </main>
  );
}
