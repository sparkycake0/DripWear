"use client";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { productsRef } from "@/app/db/firebase";
import Link from "next/link";
import Checkbox from "@/app/components/Checkbox";
import "@/app/modules.css";
export default function All() {
  const [productsContainer, setProductsContainer] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [filters, showFilters] = useState(false);

  const getProducts = async () => {
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsContainer(products);
      setFilteredProducts(products);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    let filtered = productsContainer;
    if (selectedType) {
      filtered = filtered.filter((product) => product.type === selectedType);
    }
    if (
      selectedSizes.length > 0 &&
      ["shirts", "shoeses", "sweatshirts", "jackets", "sets", "pants"].includes(
        selectedType,
      )
    ) {
      filtered = filtered.filter((product) => {
        const sizeCategory =
          selectedType === "shoeses"
            ? product.sizes?.shoesSizes
            : product.sizes?.shirtSizes;

        return sizeCategory?.some(
          (size) => selectedSizes.includes(size.size) && size.available,
        );
      });
    }
    if (showDiscounted) {
      filtered = filtered.filter((product) => product.discount?.discount);
    }
    setFilteredProducts(filtered);
  }, [selectedType, selectedSizes, productsContainer, showDiscounted]);
  return (
    <main className="w-screen h-screen flex flex-col p-4">
      <div>
        <div className="flex flex-col p-2 rounded-lg items-start gap-4 bg-neutral-900">
          <button
            className="w-full text-center font-bold text-xl p-2 hover:bg-neutral-800 transition-all duration-150"
            onClick={() => showFilters(!filters)}
          >
            Filter
          </button>

          {filters && (
            <div className="flex flex-col gap-4">
              <div className="">
                <select
                  className="bg-neutral-800 p-2 rounded cursor-pointer outline-none transition-all hover:bg-neutral-700"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedSizes([]);
                  }}
                >
                  <option value="">Prozivodi</option>
                  <option value="shirts">Majice</option>
                  <option value="sweatshirts">Dukserice</option>
                  <option value="sets">Kompleti</option>
                  <option value="pants">Donji Delovi</option>
                  <option value="shoeses">Patike</option>
                  <option value="vapes">Vejpovi</option>
                  <option value="fragrance">Parfemi</option>
                  <option value="headphones">Elektronika</option>
                  <option value="others">Ostalo</option>
                </select>
              </div>

              {(selectedType === "shirts" ||
                selectedType === "shoeses" ||
                selectedType === "sweatshirts" ||
                selectedType === "jackets" ||
                selectedType === "sets" ||
                selectedType === "pants") && (
                <div className="">
                  <h2 className="">Size</h2>
                  <div className="">
                    {(selectedType === "shoeses"
                      ? [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
                      : ["S", "M", "L", "XL", "XXL"]
                    ).map((size) => (
                      <Checkbox
                        key={size}
                        size={size}
                        checked={selectedSizes.includes(size)}
                        onChange={(isChecked) => {
                          const newSizes = isChecked
                            ? [...selectedSizes, size]
                            : selectedSizes.filter((s) => s !== size);
                          setSelectedSizes(newSizes);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <Checkbox
                  checked={showDiscounted}
                  onChange={(isChecked) => setShowDiscounted(isChecked)}
                />
                <span className="">Sniženje</span>
              </div>
            </div>
          )}
        </div>
      </div>{" "}
      <div className="grid w-11/12 h-max grid-cols-2 lg:grid-cols-8 gap-8 p-4">
        {filteredProducts.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={`${product.id}-${index}`}
            className=" h-full flex flex-col gap-2 items-center cursor-pointer border-2 border-transparent bg-neutral-900 p-2"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-48 h-48 lg:w-72 lg:h-48"
            />
            <h1 className="text-md w-full ml-2">{product.name}</h1>
            <div className="w-full mt-3 ml-3 mb-2 flex flex-col h-max justify-between flex-grow">
              <h1></h1>
              <div className="flex gap-2 items-center">
                <h1
                  className={`${product.discount.discount ? "line-through text-sm text-neutral-400" : "text-sm"} font-bold`}
                >
                  {product.price} RSD
                </h1>
                <div>
                  {product.discount.discount && (
                    <h1 className="text-sm font-bold">
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
        ))}
      </div>
    </main>
  );
}
