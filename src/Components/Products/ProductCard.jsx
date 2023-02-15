import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, setPageInactive }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  // trying lazy-loading implementation using IntersectionObserver API
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "200px" }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-link"
      onClick={() => setPageInactive((prev) => !prev)}
    >
      <div key={product.id} className="product-card" ref={ref}>
        {loaded ? (
          <>
            <img
              src={product.image}
              alt={`Image of ${product.title}`}
              title={product.title}
            />
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
              <span className="product-rating">{product.rating.rate}/5</span>
              <span className="product-rating-count">
                ({product.rating.count} ratings)
              </span>
            </div>
          </>
        ) : (
          <div style={{ height: "20rem", width: "15rem" }} />
        )}
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
