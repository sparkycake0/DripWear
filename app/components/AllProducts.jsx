"use client";
import { useState, useEffect } from "react";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { firestore, productsRef } from "../db/firebase";

export default function AllProducts() {
  const [productsContainer, setProductsContainer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        try {
          return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            img: doc.data().img,
            type: doc.data().type,
            discount: doc.data().discount,
            quantity: doc.data().quantity,
            sizes: doc.data().sizes,
          };
        } catch (err) {
          console.log(err);
        }
      });
      setProductsContainer(products);
      console.log(products);
    });
  };
  const deleteProduct = async (id) => {
    const productDoc = doc(productsRef.firestore, productsRef.path, id);
    await deleteDoc(productDoc);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main className="flex">
      <div className="grid grid-cols-1 place-items-center lg:grid-cols-5 flex-grow gap-4 p-4 bg-neutral-900">
        {productsContainer.map((product, index) => (
          <div
            key={`${product.name}-${index}`}
            className="bg-neutral-800 p-2 m-5 rounded-lg h-max w-max flex flex-col"
          >
            <img
              src={product.img}
              alt="asd"
              className="w-48 h-48 self-center mb-2 rounded-lg"
            />
            <h1>ID:{product.id}</h1>
            <h1>Title: {product.name}</h1>
            <h1>Type: {product.type}</h1>
            <div className="w-64 h-32 my-4 break-words overflow-y-auto">
              <h1>Description: {product.description}</h1>
            </div>

            <div className="flex gap-2">
              <h1
                className={`${product.discount.discount ? "line-through" : ""}`}
              >
                ${product.price}
              </h1>
              {product.discount.discount && (
                <h1>
                  $
                  {product.price -
                    product.price * (product.discount.percentage / 100)}
                </h1>
              )}
            </div>
            <h1>{product.quantity}</h1>
            {product.type === "shirts" ? (
              <h1>
                Available Shirt Sizes:{" "}
                {product.sizes.shirtSizes
                  .filter((size) => size.available)
                  .map((size) => size.size)
                  .join(", ")}
              </h1>
            ) : (
              ""
            )}
            {product.type === "jackets" ? (
              <h1>
                Available Shirt Sizes:{" "}
                {product.sizes.shirtSizes
                  .filter((size) => size.available)
                  .map((size) => size.size)
                  .join(", ")}
              </h1>
            ) : (
              ""
            )}
            {product.type === "sweatshirts" ? (
              <h1>
                Available Shirt Sizes:{" "}
                {product.sizes.shirtSizes
                  .filter((size) => size.available)
                  .map((size) => size.size)
                  .join(", ")}
              </h1>
            ) : (
              ""
            )}
            {product.type === "sets" ? (
              <h1>
                Available Shirt Sizes:{" "}
                {product.sizes.shirtSizes
                  .filter((size) => size.available)
                  .map((size) => size.size)
                  .join(", ")}
              </h1>
            ) : (
              ""
            )}
            {product.type === "pants" ? (
              <h1>
                Available Shirt Sizes:{" "}
                {product.sizes.shirtSizes
                  .filter((size) => size.available)
                  .map((size) => size.size)
                  .join(", ")}
              </h1>
            ) : (
              ""
            )}
            {product.type === "shoeses" ? (
              <div>
                <h1>Available Shoeses Sizes:</h1>
                <h1>
                  {product.sizes.shoesSizes
                    .filter((size) => size.available)
                    .map((size) => size.size)
                    .join(", ")}
                </h1>
              </div>
            ) : (
              <h1> </h1>
            )}
            <button
              className="text-black font-bold p-1 bg-red-500 rounded-lg mt-2"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
