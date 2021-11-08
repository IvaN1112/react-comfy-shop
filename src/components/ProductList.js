import React from "react";
import { useFilterContext } from "../context/filter_context";
import { useProductsContext } from "../context/products_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    filtered_products: products,
    grid_view,
    products_error: error,
  } = useFilterContext();
  const { products_loading: loading } = useProductsContext();
  if (loading) {
    return <h5 style={{ textTransform: "none" }}>Loading...</h5>;
  }
  if (error) {
    return (
      <h5 style={{ textTransform: "none" }}>
        There was an error loading this page, please contact the site owners.
      </h5>
    );
  }
  if (products.length < 1 && !loading) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view) {
    return <GridView products={products} />;
  } else {
    return <ListView products={products} />;
  }
};

export default ProductList;
