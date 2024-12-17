"use client";
import { useState, useEffect } from "react";
import { firestore, productsRef } from "@/app/db/firebase";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function ClothesPage() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      const filteredProducts = snapshot.docs
        .map((doc) => {
          try {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              description: data.description,
              price: data.price,
              img: data.img,
              type: data.type,
              discount: data.discount,
              quantity: data.quantity,
              sizes: data.sizes,
            };
          } catch (err) {
            console.log(err);
            return null;
          }
        })
        .filter((product) => product && ["shirts"].includes(product.type));

      setProducts(filteredProducts);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main className="grid w-11/12 h-max grid-cols-2 lg:grid-cols-8 gap-8 p-4 place-items-center self-center">
      {products.length > 0 ? (
        products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={`${product.id}-${index}`}
            className=" h-full flex flex-col items-center cursor-pointer border-2 border-transparent p-2"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-48 h-48 lg:w-72 lg:h-48 mb-2"
            />
            <h1 className="w-full h-max flex items-end">{product.name}</h1>
            <div className="w-full mt-1 flex flex-col h-max justify-between flex-grow">
              <div className="flex gap-2 items-center">
                <h1
                  className={`${product.discount.discount ? "line-through text-sm text-neutral-400" : "text-sm"}`}
                >
                  {product.price} RSD
                </h1>
                <div>
                  {product.discount.discount && (
                    <h1 className="text-sm">
                      {product.price -
                        product.price *
                          (product.discount.percentage / 100)}{" "}
                      RSD
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <h1>No products found</h1>
      )}
    </main>
  );
}
