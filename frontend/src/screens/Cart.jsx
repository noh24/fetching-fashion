import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const updatedCartItem = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${item.name || item.name} is out of stock.`);
      }
      dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const removeCartItems = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const proceedToCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <main>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* Cart items */}
      {cart.length <= 0 ? (
        <div>
          Shopping cart empty. <Link to='/'>Go shopping</Link>
        </div>
      ) : (
        <section>
          {cart.map((item) => (
            <article key={item._id}>
              <div>
                <Link to={`/product/${item._id}`}></Link>
                <img src={item.images[0]} alt={item.name} />
                <p>{`${item.color} ${item.name}`}</p>
              </div>
              <div>
                <button
                  disabled={item.quantity <= 0}
                  onClick={() => updatedCartItem(item, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  disabled={item.quantity >= item.countInStock}
                  onClick={() => updatedCartItem(item, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p>${item.price}</p>
              <div>
                <button onClick={() => removeCartItems(item)}>Remove</button>
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
            <button onClick={proceedToCheckout}>Proceed To Checkout</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Cart;
