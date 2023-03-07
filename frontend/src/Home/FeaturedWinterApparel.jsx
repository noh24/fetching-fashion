import React, { useEffect } from "react";
import Product from "../Shared/Product";
import useProductReducer from "../Reducers/productReducer";
import axios from "axios";
import getError from "../Utility/getError";

const FeaturedWinterApparel = () => {
  const { loading, error, products, dispatch } = useProductReducer();
  const { fleeceSherpas, jacketVests } = products;

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
      <Product product={fleeceSherpas[0]}></Product>
      <Product product={jacketVests[1]}></Product>
    </div>
  );
};

export default FeaturedWinterApparel;
