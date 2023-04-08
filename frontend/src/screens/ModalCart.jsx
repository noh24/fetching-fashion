import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../Utility/getError";
import { Helmet } from "react-helmet-async";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ToggleCartStore } from "../Utility/toggleCartStore";

const ModalCart = (props) => {
  const navigate = useNavigate();
  const {
    toggleCart: [, setToggleCart],
  } = useContext(ToggleCartStore);
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart } = state;

  const updatedCartItem = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${item.name || item.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const removeCartItems = (item) => {
    storeDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const proceedToCheckout = () => {
    navigate("/signin?redirect=/payment");
    exitModalCart();
  };

  const exitModalCart = () => {
    setToggleCart((prev) => !prev);
  };
  const goShoppingLink = () => {
    setToggleCart((prev) => !prev);
    navigate("/");
  };

  return (
    <section className='flex flex-col sm:items-end h-screen'>
      <div
        className='bg-transparent w-full flex-1 fixed inset-0'
        onClick={exitModalCart}
      ></div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className='relative flex-1 flex flex-col items-center space-y-2 bg-white overflow-y-scroll no-scrollbar z-40 sm:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4'>
        {/* CART HEADER */}
        <h1 className='text-2xl p-4 flex items-end justify-between bg-white sticky top-0 font-light z-50 w-full'>
          <span>
            Cart <span className='font-normal'>({cart.length})</span>
          </span>
          <CloseIcon onClick={exitModalCart} className='cursor-pointer' />
        </h1>
      {/* CART ITEMS */}
        {cart.length <= 0 ? (
          <div className='flex-1 flex items-center gap-1'>
            Shopping cart empty.
            <span
              className='underline text-sky-600 font-medium cursor-pointer'
              onClick={goShoppingLink}
            >
              Go shopping
            </span>
          </div>
        ) : (
          <div className='mb-6 flex flex-col items-center space-y-8 flex-1 opacity-100 px-2 sm:px-8'>
            {cart.map((item) => (
              <article
                key={item._id}
                className='flex grid-cols-3 items-center justify-between w-full space-x-2'
              >
                <div className=''>
                  <img
                    className='w-24 object-cover'
                    src={item.images[0]}
                    alt={item.name}
                  />
                </div>

                <div className='flex-1 flex flex-col justify-between space-y-1'>
                  <div>
                    <Link to={`/product/${item._id}`} onClick={exitModalCart}>
                      <p className='font-medium'>{`${item.color} ${item.name}`}</p>
                    </Link>
                  </div>
                  <p className='text-gray-800'>${item.price}</p>

                  <div className='flex justify-between pr-4'>
                    <div className='flex gap-4'>
                      <button
                        disabled={item.quantity <= 1}
                        className='disabled:opacity-50'
                        onClick={() => updatedCartItem(item, item.quantity - 1)}
                      >
                        <RemoveCircleOutlineIcon fontSize='small' />
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        disabled={item.quantity >= item.countInStock}
                        className='disabled:opacity-50'
                        onClick={() => updatedCartItem(item, item.quantity + 1)}
                      >
                        <AddCircleOutlineIcon fontSize='small' />
                      </button>
                    </div>
                    <button
                      className='text-xs border-b border-gray-600 font-light'
                      onClick={() => removeCartItems(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {/* CHECKOUT */}
        <div className='w-full pb-32 sm:pb-16 sm:flex-initial bg-white p-4 flex flex-col justify-center items-center space-y-4 py-4'>
          <h1 className='text-2xl'>
            Subtotal ({cart.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
            Items): $
            {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}{" "}
          </h1>
          <div className='self-center'>
            <button
              className='bg-gray-800 px-12 py-3 text-sm rounded-full text-white disabled:opacity-90 disabled:cursor-not-allowed'
              disabled={cart.length <= 0}
              onClick={proceedToCheckout}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalCart;
