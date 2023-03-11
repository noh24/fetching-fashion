import React, { useEffect } from "react";
import Product from "./Product";
import useProductReducer from "../hooks/useProductReducer";
import axios from "axios";
import getError from "../utility/getError";
import { Link } from "react-router-dom";

const FeaturedHomeSection = () => {
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
    <section className='my-10 sm:my-20 px-2 flex flex-col items-center justify-center text-gray-500'>
      <Link to={`/products/winter-apparel`}>
        <h1 className='sm:text-2xl text-xl mb-10 sm:mb-20'>Shop Winter Apparel</h1>
      </Link>
      <div className='w-full sm:grid sm:grid-cols-2'>
          <Product product={products[0]}></Product>
          <Product product={products[products.length - 1]}></Product>
      </div>
    </section>
  );
};

export default FeaturedHomeSection;
