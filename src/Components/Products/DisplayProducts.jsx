import React from "react";
import ProductCard from "./ProductCard";

const DisplayProducts = ({
  filteredProducts,
  setPageInactive
}) => {
  return (
    <div className="products-container">
      {filteredProducts.length === 0 ? (
        <div className="no-data">Product not found.</div>
      ) : (
        <>
          {filteredProducts.map((product) => {
            return (
              <ProductCard key={product.id} product={product} setPageInactive={setPageInactive} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayProducts;
