import React, { useEffect } from "react";
import Product from "./Product";
import useProductReducer from "../hooks/useProductReducer";
import axios from "axios";
import getError from "../Utility/getError";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

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

  return (
    <section className='mt-8 sm:mt-16 px-2 flex flex-col items-center justify-center'>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='text-center'>
          <Link to={`/products/winter-apparel`}>
            <h1 className='sm:text-2xl text-xl mb-8 sm:mb-12 font-medium text-sky-600 hover:opacity-60'>
              Shop Winter Apparel
            </h1>
          </Link>
          <div className='w-full lg:grid lg:grid-cols-2 lg:gap-8'>
            <Product product={products[0]}></Product>
            <Product product={products[products.length - 1]}></Product>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedHomeSection;
