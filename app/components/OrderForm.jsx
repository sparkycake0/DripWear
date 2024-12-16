"use client";
import { useState, useEffect, useRef } from "react";
import "../modules.css";
import { firestore, ordersRef } from "../db/firebase";
import { addDoc, deleteDoc } from "firebase/firestore";

export default function OrderForm({ cartData, setForm, docRef }) {
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    cartData: cartData,
  });

  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setForm]);
  const addOrder = async () => {
    await addDoc(ordersRef, order);
  };
  const deleteCart = async () => {
    if (!docRef) {
      console.error("Error: docRef is undefined. Cannot delete cart.");
      return;
    }
    try {
      await deleteDoc(docRef);
      console.log("Cart deleted successfully.");
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };
  return (
    <main className="fixed left-0 top-0 backdrop-blur-sm flex w-full h-full justify-center items-center">
      <form
        ref={formRef}
        className="z-2 bg-neutral-900 p-4 rounded-lg flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(order);
          setForm(false);
          addOrder();
          deleteCart();
        }}
      >
        <div>
          <h1>Ime i prezime</h1>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
          />
        </div>
        <div>
          <h1>Email</h1>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setOrder({ ...order, email: e.target.value })}
          />
        </div>
        <div>
          <h1>Adresa stanovanja</h1>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setOrder({ ...order, address: e.target.value })}
          />
        </div>
        <div>
          <h1>Broj telefona</h1>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-button">
          Dodaj u korpu
        </button>
      </form>
    </main>
  );
}
