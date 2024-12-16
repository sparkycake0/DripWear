"use client";
import React, { useState, useEffect } from "react";
import { ordersRef } from "../db/firebase"; // Ensure this is correctly imported from your Firebase setup
import { getDocs } from "firebase/firestore";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(ordersRef);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      console.log(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col gap-4 pt-8 lg:w-7/12 self-center">
      <h1 className="text-4xl ml-4 mb-4">Porudzbine:</h1>
      <div className="flex justify-between w-full *:w-1/5 *:text-center">
        <h1>ID Porudzbine/ID Proizvoda</h1>
        <h1>Ime/Ime Proizvoda</h1>
        <h1>Email/Cena Proizvoda</h1>
        <h1>Adresa/Kolicina Proizvoda</h1>
        <h1>Telefon/Velicina Proizvoda</h1>
      </div>
      <div className="bg-neutral-500 h-0.5 w-full"></div>
      <div className="grid w-full place-items-center grid-cols-1 gap-6 p-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col w-full bg-neutral-900 h-max"
            >
              <div className="p-2 flex *:h-max *:w-1/6 *:text-wrap *:text-center w-full items-center justify-between">
                <h1>{order.id}</h1>
                <h1>{order.name}</h1>
                <h1>{order.email}</h1>
                <h1>{order.address}</h1>
                <h1>{order.phone}</h1>
              </div>
              <div className="flex flex-col gap-1 mt-8">
                {order.cartData.map((product, index) => (
                  <div
                    key={`${product.price}-${index}`}
                    className="flex *:w-1/5 *:text-center items-center"
                  >
                    <div>{index}</div>
                    <div>{product.productName}</div>
                    <div>{product.productPrice}</div>
                    <div>{product.quantity}</div>
                    <div>
                      {product.productSize === ""
                        ? "Ne treba velicina"
                        : product.productSize}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </main>
  );
}
