import axios from "axios";
import React, { useContext, useEffect } from "react";
import useProductReducer from "../hooks/useProductReducer";
import { useParams } from "react-router-dom";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";
import SizeTable from "../components/SizeTable";
import SizeGuide from "../components/SizeGuide";
import Rating from "../components/Rating";
import { Store } from "../Store";
import { toast } from "react-toastify";

const SingleWinterApparel = () => {
  const params = useParams();
  const { loading, error, products: product, dispatch } = useProductReducer();

  const { state, dispatch: storeDispatch } = useContext(Store);

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${params.id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [params, dispatch]);

  const addToCartHandler = async (product) => {
    try {
      const itemExist = state.cart.find((item) => item._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${itemExist.name || product.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section>
          <Helmet>
            <title>{`${product.name}`}</title>
          </Helmet>
          <article>
            {product.images.map((item) => (
              <div key={item}>
                <img src={item} alt={product.name} />
              </div>
            ))}
          </article>

          <article>
            <div>
              <Rating rating={product.rating} reviews={product.reviews} />
              <h3>{`${product.color} ${product.name}`}</h3>
              <p>
                <span>${product.price + 10}</span> ${product.price}
              </p>
            </div>
            <div>
              <button type='button' onClick={() => addToCartHandler(product)}>
                Add To Cart
              </button>
            </div>
            <div>
              {product.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
          </article>

          <SizeTable />
          <SizeGuide />
        </section>
      )}
    </main>
  );
};

export default SingleWinterApparel;
