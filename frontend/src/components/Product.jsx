import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import getError from "./../utility/getError";
import axios from "axios";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch : storeDispatch } = useContext(Store);

  const addCartHandler = async (product) => {
    try {
      const itemExist = state.cart.find((item) => item._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${itemExist.name || product.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: {...product, quantity} })
    } catch (err) {
      toast.error(getError(err));
    }
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
      <button type='button' onClick={() => addCartHandler(product)}>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
