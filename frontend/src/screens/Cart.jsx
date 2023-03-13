import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Cart = () => {
  const navigate = useNavigate();
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
    navigate("/signin?redirect=/shipping");
  };

  return (
    <main className='flex flex-col px-2 container mx-auto outline w-full lg:grid lg:grid-cols-2'>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* Cart items */}
      {cart.length <= 0 ? (
        <div>
          Shopping cart empty. <Link to='/'>Go shopping</Link>
        </div>
      ) : (
        <section className='flex flex-col outline items-center space-y-4'>
          {cart.map((item) => (
            <article
              key={item._id}
              className='grid grid-cols-3 items-end justify-around w-full outline'
            >
              <div>
                <img className='w-24' src={item.images[0]} alt={item.name} />
              </div>
              <div className='self-center col-span-2'>
                <Link to={`/product/${item._id}`}>
                  <p>{`${item.color} ${item.name}`}</p>
                </Link>
                <p>${item.price}</p>

              <div className='flex justify-between pr-4'>
                <div className='space-x-2'>
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updatedCartItem(item, item.quantity - 1)}
                    >
                    <RemoveCircleOutlineIcon className='' fontSize='small' />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={item.quantity >= item.countInStock}
                    onClick={() => updatedCartItem(item, item.quantity + 1)}
                    >
                    <AddCircleOutlineIcon fontSize='small' />
                  </button>
                </div>
                <button onClick={() => removeCartItems(item)}>Remove</button>
                    </div>
              </div>
            </article>
          ))}
        </section>
      )}
      {/* Checkout */}
      <section>
        <article>
          <h1>
            Subtotal ({cart.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
            Items): $
            {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}{" "}
          </h1>
          <div>
            <button disabled={cart.length <= 0} onClick={proceedToCheckout}>
              Proceed To Checkout
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Cart;
