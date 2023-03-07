import axios from "axios";
import React, { useEffect } from "react";
import useProductReducer from "../hooks/useProductReducer";
import { useParams } from "react-router-dom";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";
import SizeTable from "../shared/SizeTable";
import SizeGuide from "../shared/SizeGuide";
import Rating from "../shared/Rating";

const SingleWinterApparel = () => {
  const { loading, error, products: product, dispatch } = useProductReducer();
  const params = useParams();

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
              <Rating rating={product.rating}/>
              <h3>{`${product.color} ${product.name}`}</h3>
              <p><span>${product.price + 10}</span> ${product.price}</p>
            </div>
            <div>
              {product.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
          </article>

          <SizeTable/>
          <SizeGuide/>
        </section>
      )}
    </main>
  );
};

export default SingleWinterApparel;
