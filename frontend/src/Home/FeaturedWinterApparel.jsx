import React, { useEffect } from "react";
import Product from "../Shared/Product";
import data from "../data/data";
import useProductReducer from "../Reducers/productReducer";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedWinterApparel = () => {
  const { loading, error, products, dispatch } = useProductReducer();
  const { fleeceSherpas, jacketVests } = products;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.log(err.message)
        dispatch({ type: "FETCH_FAIL", payload: err.message });
        toast.error(err);
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
