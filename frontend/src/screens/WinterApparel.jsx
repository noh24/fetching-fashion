import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useProductReducer from "../hooks/useProductReducer";
import Product from "../components/Product";
import getError from "../Utility/getError";
import LoadingSpinner from "../components/LoadingSpinner";

const WinterApparel = () => {
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
    <main className='text-gray-500 flex flex-col items-center px-2 sm:px-4'>
      <Helmet>
        <title>Winter Apparel</title>
      </Helmet>
      <h1 className='sm:text-2xl text-xl mb-10'>Winter Apparel</h1>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section className='lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4'>
          {products.map((item) => (
            <Product key={item._id} product={item}></Product>
          ))}
        </section>
      )}
    </main>
  );
};

export default WinterApparel;
