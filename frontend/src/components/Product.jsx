import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import getError from "../Utility/getError";
import axios from "axios";
import Rating from "./Rating";
import { ToggleCartStore } from "../Utility/toggleCartStore.js";

const Product = (props) => {
  const {
    toggleCart: [, setToggleCart],
  } = useContext(ToggleCartStore);
  const { product } = props;
  const { state, dispatch: storeDispatch } = useContext(Store);

  const addCartHandler = async (product) => {
    try {
      const itemExist = state.cart.find((item) => item._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${itemExist.name || product.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
      setToggleCart(prev => !prev);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-4 my-6 text-center'>
      <Link to={`/product/${product._id}`} className='hover:opacity-90'>
        <div className='h-[350px] w-full md:h-[400px] md:w-[400px] overflow-hidden relative mb-4'>
          <img
            className='h-full w-full object-cover z-10 hover:z-0 md:absolute'
            src={product.images[0]}
            alt={`${product.color} ${product.name}`}
          />
          <img
            className='h-full w-full object-cover hover:z-10 md:absolute'
            src={product.images[1]}
            alt={`${product.color} ${product.name}`}
          />
        </div>

        <div className='space-y-3 font-medium flex flex-col items-center'>
          <p className='text-lg'>{`${product.color} ${product.name}`}</p>
          <Rating rating={product.rating} reviews={product.reviews} />
          <p>
            <span className='line-through text-gray-400'>
              ${product.price + 10}
            </span>{" "}
            <span className='text-green-500'>${product.price}</span>
          </p>
        </div>
      </Link>

      <div>
        <button
          className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full shadow-sm hover:opacity-90'
          type='button'
          onClick={() => addCartHandler(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
