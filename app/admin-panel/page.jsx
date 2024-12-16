"use client";
import React, { useState } from "react";
import { productsRef } from "../db/firebase";
import { addDoc } from "firebase/firestore";
import "../modules.css";
import AllProducts from "../components/AllProducts";

export default function AdminPanel() {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    img: "",
    type: "",
    discount: {
      discount: false,
      percentage: 0,
    },
    description: "",
    quantity: 0,
    sizes: {
      shirtSizes: [
        { size: "S", available: false },
        { size: "M", available: false },
        { size: "L", available: false },
        { size: "XL", available: false },
        { size: "XXL", available: false },
      ],
      shoesSizes: [
        { size: 36, available: false },
        { size: 37, available: false },
        { size: 38, available: false },
        { size: 39, available: false },
        { size: 40, available: false },
        { size: 41, available: false },
        { size: 42, available: false },
        { size: 43, available: false },
        { size: 44, available: false },
        { size: 45, available: false },
        { size: 46, available: false },
      ],
    },
  });

  const handleTypeChangeForType = (event) => {
    setProductData((prevData) => ({
      ...prevData,
      type: event.target.value,
    }));
  };

  const handleDiscountToggle = (event) => {
    const isDiscounted = event.target.checked;
    setProductData((prevData) => ({
      ...prevData,
      discount: {
        ...prevData.discount,
        discount: isDiscounted,
        percentage: isDiscounted ? prevData.discount.percentage : 0,
      },
    }));
  };

  const handleDiscountPercentageChange = (event) => {
    const discountPercentage = parseInt(event.target.value, 10) || 0;
    setProductData((prevData) => ({
      ...prevData,
      discount: {
        ...prevData.discount,
        percentage: discountPercentage,
      },
    }));
  };

  const handleSizeChange = (type, sizeIndex) => {
    setProductData((prevData) => {
      const updatedSizes = prevData.sizes[type].map((size, index) =>
        index === sizeIndex ? { ...size, available: !size.available } : size,
      );
      return {
        ...prevData,
        sizes: {
          ...prevData.sizes,
          [type]: updatedSizes,
        },
      };
    });
  };
  const addProduct = async () => {
    addDoc(productsRef, productData);
  };
  return (
    <main className="flex w-full h-screen flex-col lg:flex-row">
      <div className="lg:w-max h-max p-4 w-full relative max-h-max min-h-screen flex items-center justify-center">
        <form
          onSubmit={(e) => {
            addProduct();
            e.preventDefault();
          }}
          className="flex flex-col gap-4 p-4 bg-neutral-900 rounded-xl self-justify-center"
        >
          <div>
            <h1>Name</h1>
            <input
              className="text-input"
              type="text"
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <h1>Price</h1>
            <input
              type="number"
              className="text-input"
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              required
            />
          </div>
          <div>
            <h1>Image URL</h1>
            <input
              type="text"
              className="text-input"
              onChange={(e) =>
                setProductData({ ...productData, img: e.target.value })
              }
              required
            />
          </div>
          <div>
            <h1>Type</h1>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="shirts"
                onChange={handleTypeChangeForType}
                checked={productData.type === "shirts"}
                required
              />
              <h1>Shirt</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="shoeses"
                onChange={handleTypeChangeForType}
                checked={productData.type === "shoeses"}
                required
              />
              <h1>Shoes</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="jackets"
                onChange={handleTypeChangeForType}
                checked={productData.type === "jackets"}
                required
              />
              <h1>Jacket</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="sets"
                onChange={handleTypeChangeForType}
                checked={productData.type === "sets"}
                required
              />
              <h1>Set</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="sweatshirts"
                onChange={handleTypeChangeForType}
                checked={productData.type === "sweatshirts"}
                required
              />
              <h1>Sweatshirt</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="pants"
                onChange={handleTypeChangeForType}
                checked={productData.type === "pants"}
                required
              />
              <h1>Pants</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="vapes"
                onChange={handleTypeChangeForType}
                checked={productData.type === "vapes"}
                required
              />
              <h1>Vapes</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                className="radio-input"
                value="fragrance"
                onChange={handleTypeChangeForType}
                checked={productData.type === "fragrance"}
                required
              />
              <h1>Fragrance</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                value="headphones"
                onChange={handleTypeChangeForType}
                checked={productData.type === "headphones"}
                required
              />
              <h1>Headphones</h1>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="productType"
                value="others"
                onChange={handleTypeChangeForType}
                checked={productData.type === "others"}
                required
              />
              <h1>Other</h1>
            </div>
          </div>

          {productData.type === "shoeses" && (
            <div>
              <h1>Shoe Sizes</h1>
              {productData.sizes.shoesSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shoesSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}

          {productData.type === "shirts" && (
            <div>
              <h1>Shirt Sizes</h1>
              {productData.sizes.shirtSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shirtSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}
          {productData.type === "jackets" && (
            <div>
              <h1>Shirt Sizes</h1>
              {productData.sizes.shirtSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shirtSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}
          {productData.type === "sets" && (
            <div>
              <h1>Shirt Sizes</h1>
              {productData.sizes.shirtSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shirtSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}
          {productData.type === "sweatshirts" && (
            <div>
              <h1>Shirt Sizes</h1>
              {productData.sizes.shirtSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shirtSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}
          {productData.type === "pants" && (
            <div>
              <h1>Shirt Sizes</h1>
              {productData.sizes.shirtSizes.map((size, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={size.available}
                    onChange={() => handleSizeChange("shirtSizes", index)}
                  />
                  <h1>{size.size}</h1>
                </div>
              ))}
            </div>
          )}
          <div>
            <h1>Discount</h1>
            <div className="flex gap-4">
              <input
                type="checkbox"
                onChange={handleDiscountToggle}
                checked={productData.discount.discount}
              />
              <h1>Enable Discount</h1>
            </div>
            {productData.discount.discount && (
              <>
                <h1>Discount in %</h1>
                <input
                  type="number"
                  className="text-input"
                  min="0"
                  max="100"
                  value={productData.discount.percentage}
                  onChange={handleDiscountPercentageChange}
                />
              </>
            )}
          </div>

          <div>
            <h1>Description</h1>
            <textarea
              className="text-input"
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              required
            />
          </div>

          <div>
            <h1>Quantity</h1>
            <input
              type="number"
              className="text-input"
              onChange={(e) =>
                setProductData({ ...productData, quantity: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>
      <div className="flex-grow bg-neutral-900">
        <AllProducts />
      </div>
    </main>
  );
}
