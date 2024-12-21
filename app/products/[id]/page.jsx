"use client";
import React, { useState, useEffect } from "react";
import { productsRef, firestore, cartRef } from "@/app/db/firebase";
import {
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import OrderForm from "@/app/components/OrderForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/db/firebase";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = React.use(params);
  const [user, setUser] = useState(null);
  const [added, setAdded] = useState(false);
  const [timer, setTimer] = useState(true);
  const [sizeCheck, setSizeCheck] = useState(false);

  const Timer = () => {
    setTimer(false);
    setTimeout(() => {
      setTimer(true);
      setAdded(false);
    }, 3000);
  };
  const SizeTimer = () => {
    setTimer(false);
    setTimeout(() => {
      setTimer(true);
      setSizeCheck(false);
    }, 3000);
  };
  const FetchProduct = async () => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
    }
  };
  useEffect(() => {
    FetchProduct();
    onAuthStateChanged(auth, async (user) => {
      await setUser(user);
    });
  }, [id]);
  if (!product) {
    return <main>Loading..</main>;
  }
  const SelectSize = (size) => {
    setSelectedSize(size);
  };
  const getCart = async () => {
    try {
      const q = query(cartRef, where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const cartDoc = querySnapshot.docs[0];
        return { id: cartDoc.id, ...cartDoc.data() };
      } else {
        console.log("No cart found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const addToCart = async () => {
    const data = {
      user: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      products: [
        {
          productName: product.name,
          productPrice: product.discount.discount
            ? product.price -
              product.price * (product.discount.percentage / 100)
            : product.price,
          productSize: selectedSize,
          productImg: product.img,
          quantity: 1,
        },
      ],
    };

    const cart = await getCart();

    if (!cart) {
      console.log("No cart found. Creating new cart with data:", data);
      await addDoc(cartRef, data);
      setAdded(true);
    } else {
      console.log("Existing cart found. Checking products...");
      const cartDocRef = doc(firestore, "carts", cart.id);
      const existingProductIndex = cart.products.findIndex(
        (p) =>
          p.productName === data.products[0].productName &&
          p.productSize === data.products[0].productSize,
      );

      if (existingProductIndex !== -1) {
        console.log("Product already exists. Updating quantity...");
        const updatedProducts = [...cart.products];
        updatedProducts[existingProductIndex].quantity += 1;

        await updateDoc(cartDocRef, {
          products: updatedProducts,
        });
        setAdded(true);
      } else {
        console.log(
          "Product does not exist. Adding new product with quantity 1...",
        );
        await updateDoc(cartDocRef, {
          products: arrayUnion({
            ...data.products[0],
            quantity: 1,
          }),
        });
        setAdded(true);
      }
    }
  };

  return (
    <main className="flex flex-col lg:flex-row w-screen h-screen gap-1.5 lg:justify-center lg:items-center ">
      <div className="px-4 mt-2 lg:w-5/12">
        <img
          src={product.img}
          alt=""
          className="rounded-lg border-4 border-neutral-700 w-full"
        />
      </div>
      <div className="h-full lg:border-2 lg:border-neutral-700 lg:h-4/6 flex flex-col items-center p-4 bg-neutral-950 rounded-lg">
        <div className="flex flex-col w-full justify-self-start">
          <div className=" flex flex-col gap-2 p-2 -mt-2">
            <h1 className="text-neutral-400">DripWear</h1>
            <h1 className="flex gap-5 text-3xl ">{product.name}</h1>
          </div>
          <div className="w-max flex gap-2 p-2">
            <h1
              className={`${product.discount.discount ? "line-through" : ""} text-2xl`}
            >
              {product.price} RSD
            </h1>
            <h1 className="text-2xl">
              {product.discount.discount && (
                <p>
                  {product.price -
                    product.price * (product.discount.percentage / 100)}
                  RSD
                </p>
              )}{" "}
            </h1>
          </div>
          {[
            "shirts",
            "jackets",
            "sweatshirts",
            "sets",
            "pants",
            "shoeses",
          ].includes(product.type) && (
            <div className="flex p-2 w-full">
              {product.type === "shoeses" && (
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.shoesSizes
                    .filter((size) => size.available)
                    .map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-1 border-2 border-neutral-900 rounded-full hover:bg-neutral-900 transition-color duration-150 cursor-pointer ${selectedSize == size.size ? "bg-neutral-900" : null}`}
                        onClick={() => SelectSize(size.size)}
                      >
                        {size.size}
                      </button>
                    ))}
                </div>
              )}
              {["shirts", "jackets", "sweatshirts", "sets", "pants"].includes(
                product.type,
              ) && (
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.shirtSizes
                    .filter((size) => size.available)
                    .map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-1 border-2 rounded-full hover:bg-neutral-900 transition-color duration-150 cursor-pointer text-lg ${selectedSize == size.size ? "bg-neutral-900" : null} ${sizeCheck ? "border-red-500" : "border-neutral-900"} `}
                        onClick={() => SelectSize(size.size)}
                      >
                        {size.size}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
          <div className="p-2 text-wrap w-96 pb-28">{product.description}</div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                if (
                  [
                    "shirts",
                    "sweatshirts",
                    "sets",
                    "pants",
                    "shoeses",
                    "jackets",
                  ].includes(product.type) &&
                  selectedSize !== ""
                ) {
                  addToCart();
                  Timer();
                }
                if (
                  [
                    "shirts",
                    "sweatshirts",
                    "sets",
                    "pants",
                    "shoeses",
                    "jackets",
                  ].includes(product.type) &&
                  selectedSize === ""
                ) {
                  setSizeCheck(true);
                  SizeTimer();
                }
                if (
                  ["fragrance", "vapes", "headphones"].includes(product.type) &&
                  selectedSize === ""
                ) {
                  addToCart();
                  Timer();
                }
              }}
              className={`text-center w-7/12 lg:w-9/12 flex justify-center items-center px-2 py-3 transition-all duration-150 text-xl ${added ? "bg-green-400 hover:bg-green-500 text-black" : "bg-neutral-900 hover:bg-neutral-800 "} font-bold rounded-full`}
            >
              {added ? "Dodato u korpu" : "Kupi"}
            </button>
          </div>
        </div>
      </div>
      {selectedSize === "" ?? <div></div>}
    </main>
  );
}
