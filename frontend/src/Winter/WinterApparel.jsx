import axios from "axios";
import React, { useEffect } from "react";
import useProductReducer from "../Reducers/productReducer";
import Product from "../Shared/Product";
import getError from "../Utility/getError";

const WinterApparel = () => {
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
    fetchData()
  }, [dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <main>
      <section>
        {fleeceSherpas.map((item) => (
          <Product key={item._id} product={item}></Product>
        ))}
        {jacketVests.map((item) => (
          <Product key={item._id} product={item}></Product>
        ))}
      </section>
    </main>
  );
};

export default WinterApparel;
