import React, { lazy, Suspense, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import useFetch from "../Hooks/useFetch";
import Loading from "../Components/Loading";

const FilterProduct = lazy(() =>
  shortDelay(import("../Components/Products/FilterProduct"))
);
const DisplayProducts = lazy(() =>
  shortDelay(import("../Components/Products/DisplayProducts"))
);

const Products = () => {
  const [pageInactive, setPageInactive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProductId = searchParams.get("productId");
  const selectedCategory = searchParams.get("category");
  const { fetchPureInfo, error } = useFetch(
    "https://fakestoreapi.com/products"
  );
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  let filteredProducts = fetchPureInfo;
  if (selectedProductId) {
    filteredProducts = filteredProducts.filter(
      (product) => product.id.toString() === selectedProductId
    );
  }
  if (selectedCategory !== null && selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toString() === selectedCategory
    );
  }

  return (
    <section
      className={
        pageInactive
          ? "product-page-container inactive-container"
          : "product-page-container"
      }
    >
      <Suspense fallback={<Loading />}>
        <h1>Our Products</h1>
        <FilterProduct
          selectedCategory={selectedCategory}
          selectedProductId={selectedProductId}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <DisplayProducts
          filteredProducts={filteredProducts}
          setPageInactive={setPageInactive}
        />
      </Suspense>
      {createPortal(
        <Outlet context={[fetchPureInfo, setPageInactive]} />,
        document.body
      )}
    </section>
  );
};

export default Products;

// just for practice
async function shortDelay(promise) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return promise;
}
