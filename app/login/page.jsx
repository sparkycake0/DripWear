"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../db/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      router.push("/");
    });
  };
  return (
    <main>
      <div>
        <button onClick={googleLogin}>Google</button>
      </div>
    </main>
  );
}
