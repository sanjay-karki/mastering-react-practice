import React from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";

const FilterProduct = ({
  searchParams,
  setSearchParams,
  selectedCategory,
  selectedProductId,
}) => {
  const navigate = useNavigate();
  const handleSearchQuery = (e) => {
    setSearchParams(
      { productId: e.target.value, ...searchParams },
      { replace: true }
    );
    if (e.target.value > 20) alert("Maximum ID value is 20");
    navigate({
      pathname: "/products",
      search: selectedCategory
        ? `?productId=${e.target.value}&category=${selectedCategory}`
        : `?productId=${e.target.value}`,
    });
  };
  return (
    <form className="filter-products-container">
      <label>
        <span>Filter by Product ID: </span>
        <input
          value={searchParams.productId}
          type="number"
          max="20"
          onChange={useDebounce(handleSearchQuery, 250)}
          placeholder="ID"
        />
      </label>
      <div>
        <select
          onChange={(e) => {
            setSearchParams(
              { ...searchParams, category: e.target.value },
              { replace: true }
            );
            navigate({
              pathname: "/products",
              search: selectedProductId
                ? `?productId=${selectedProductId}&category=${e.target.value}`
                : `?category=${e.target.value}`,
            });
          }}
        >
          {[
            "Search by category",
            "all",
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing",
          ].map((category, index) => {
            if (index === 0) {
              return (
                <option value="all" selected hidden>
                  {category}
                </option>
              );
            } else {
              return (
                <option value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              );
            }
          })}
        </select>
        <input
          className="reset-filters"
          type="reset"
          value="Reset Filters"
          onClick={() => {
            navigate({
              pathname: "/products",
            });
          }}
        />
      </div>
    </form>
  );
};

export default FilterProduct;
