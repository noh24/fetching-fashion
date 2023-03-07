import React, { useEffect } from "react";
import Product from "../../shared/Product";
import useProductReducer from "../../hooks/useProductReducer";
import axios from "axios";
import getError from "../../utility/getError";

const FeaturedWinterApparel = () => {
  const { loading, error, products, dispatch } = useProductReducer();
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Product product={products[0]}></Product>
      <Product product={products[products.length - 1]}></Product>
    </div>
  );
};

export default FeaturedWinterApparel;
