import React from "react";
import { Link } from "react-router-dom";

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
              <Link
                to={`/products/${product.id}`}
                className='product-link'
                onClick={() => setPageInactive(prev => !prev)
                }
              >
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={"Image of " + product.title} title={product.title} />
                  <span className="product-title" title={product.title}>
                    {product.title}
                  </span>
                  <div>
                    <span className="product-category">
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </span>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <div>
                    <span className="product-rating">
                      {product.rating.rate}/5
                    </span>
                    <span className="product-rating-count">
                      ({product.rating.count} ratings)
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default React.memo(DisplayProducts);
