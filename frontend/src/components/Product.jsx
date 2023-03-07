import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const addCartHandler = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <img src={product.images[0]} alt={`${product.color} ${product.name}`} />
        <img src={product.images[1]} alt={`${product.color} ${product.name}`} />
        <p>{`${product.color} ${product.name}`}</p>
        <div>
          <p>
            <span>${product.price + 10}</span> ${product.price}
          </p>
        </div>
      </Link>
      <button type='button' onClick={addCartHandler}>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
