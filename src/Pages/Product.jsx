import React from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const Product = () => {
  const { productId } = useParams();
  const [fetchPureInfo, setPageInactive] = useOutletContext();
  console.log(fetchPureInfo);
  const currentProduct = fetchPureInfo.filter(
    (product) => product.id == productId
  );
  const navigate = useNavigate();
  return (
    <section className="product-details-container">
      {currentProduct.map((product) => {
        return (
          <div className="product-modularPopUp">
            <div>
              <img
                src={product.image}
                alt={"Image of Product ID: " + productId}
                title={product.title}
              />
            </div>
            <div>
              <h2>{product.title}</h2>
              <p>Description</p>
              <span>
                {product.description.charAt(0).toUpperCase() +
                  product.description.slice(1)}
              </span>
              <div>
                <h4>Product ID: {productId}</h4>
                <h4>Rating: {product.rating.rate}/5 stars</h4>
                <h4>{product.rating.count} verified user ratings</h4>
                <h4>Price: ${product.price}</h4>
              </div>
            </div>
          </div>
        );
      })}
      <div
        onClick={() => {
          navigate(-1);
          setPageInactive((prev) => !prev);
        }}
        className="close-box"
        title="Close"
      >
        <button>
          <FiX className="close-box-icon" />
        </button>
      </div>
    </section>
  );
};

export default Product;
