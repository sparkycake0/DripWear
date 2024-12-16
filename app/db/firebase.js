import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCOlW-0YrkIAQSFNh6UUz3NT_4_BGVj9k",
  authDomain: "dripwear-9d937.firebaseapp.com",
  projectId: "dripwear-9d937",
  storageBucket: "dripwear-9d937.firebasestorage.app",
  messagingSenderId: "654185257642",
  appId: "1:654185257642:web:e67068204be76f37554ed3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const productsRef = collection(firestore, "products");
export const ordersRef = collection(firestore, "orders");
export const cartRef = collection(firestore, "carts");
export const googleProvider = new GoogleAuthProvider(auth);
