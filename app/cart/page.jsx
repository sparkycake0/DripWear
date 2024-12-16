"use client";
import React, { useState, useEffect } from "react";
import { cartRef, auth } from "../db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import OrderForm from "../components/OrderForm";

export default function Cart() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState(null);
  const [formAppear, setFormAppear] = useState(false);
  const [cartDocRef, setCartDocRef] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userCart = await getCart(currentUser.uid);
        setCart(userCart);

        // Calculate total price when the cart is loaded
        if (userCart && userCart.products) {
          const total = userCart.products.reduce(
            (sum, product) => sum + product.productPrice * product.quantity,
            0,
          );
          setTotalPrice(total);
        } else {
          setTotalPrice(0);
        }
      } else {
        setCart(null);
        setTotalPrice(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const getCart = async (uid) => {
    try {
      const q = query(cartRef, where("user", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const cartDoc = querySnapshot.docs[0];
        const cartDocumentRef = doc(cartRef, cartDoc.id);
        setCartDocRef(cartDocumentRef);
        return { id: cartDoc.id, ...cartDoc.data() };
      } else {
        console.log("No cart found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  };
  const deleteFromCart = async (productName, productSize) => {
    if (!user) return;
    const q = query(cartRef, where("user", "==", user.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      const cartDocRef = doc(cartRef, cartDoc.id);
      const productIndex = cart.products.findIndex(
        (p) => p.productName === productName && p.productSize === productSize,
      );
      if (productIndex !== -1) {
        const updatedProducts = [...cart.products];
        updatedProducts.splice(productIndex, 1); // Remove the product
        await updateDoc(cartDocRef, {
          products: updatedProducts,
        });
        const newTotalPrice = updatedProducts.reduce(
          (sum, product) => sum + product.productPrice * product.quantity,
          0,
        );
        setCart({ ...cartDoc.data(), products: updatedProducts });
        setTotalPrice(newTotalPrice);
      }
    }
  };
  return (
    <main className="w-screen h-screen flex flex-col gap-2 pt-8 lg:w-7/12 self-center">
      <h1 className="text-4xl ml-4 mb-4">Vasa korpa:</h1>
      <div className="flex justify-between w-full px-8">
        <h1>Proizvod</h1>
        <h1 className="mr-4">Cena</h1>
      </div>
      <div className="bg-neutral-500 h-0.5 w-full"></div>
      <div className="grid w-full place-items-center bp grid-cols-1 gap-6 p-4">
        {cart && cart.products ? (
          cart.products.map((product, index) => (
            <div
              key={index}
              className="pr-4 bg-neutral-900 flex h-36 w-full items-center justify-between"
            >
              <div className="flex">
                <img src={product.productImg} alt="" className="size-36 mr-4" />
                <div className="h-full w-32 p-2">
                  <h1>{product.productName}</h1>
                  <h1>Cena: {product.productPrice.toLocaleString("en-US")}</h1>
                  <h1>Količina: {product.quantity}</h1>
                  {product.productSize && (
                    <h1>Velicina: {product.productSize}</h1>
                  )}
                </div>
              </div>
              <div className="h-full flex flex-col justify-around">
                <h1>{product.productPrice * product.quantity} RSD</h1>
                <button
                  onClick={() =>
                    deleteFromCart(product.productName, product.productSize)
                  }
                  className="p-2 bg-red-500 rounded-lg text-center w-max self-end hover:bg-red-400 transition-all duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-4 items-center pb-6">
        <h1 className="text-xl w-max !p-4 ">
          Ukupna cena: {totalPrice.toLocaleString("en-US")} RSD
        </h1>
        <button
          onClick={() => {
            setFormAppear(true);
          }}
          className="p-4 rounded-full bg-neutral-900 text-2xl w-3/4 hover:bg-neutral-800 transition-color duration-150"
        >
          Naruci
        </button>
      </div>
      {formAppear && (
        <OrderForm
          cartData={cart.products}
          setForm={setFormAppear}
          docRef={cartDocRef}
        />
      )}
    </main>
  );
}
