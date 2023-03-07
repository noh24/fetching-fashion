import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <main>
      {/* Cart items */}
      <section>
        {cart.map((item) => (
          <article key={item._id}>
            <div>
              <Link to={`/product/${item._id}`}></Link>
              <img src={item.images[0]} alt={item.name} />
              <p>{`${item.color} ${item.name}`}</p>
            </div>
            <div>
              <button>+</button>
              <span>{item.quantity}</span>
              <button>-</button>
            </div>
            <p>${item.price}</p>
            <div>
              <button>Remove</button>
            </div>
          </article>
        ))}
      </section>
      {/* Checkout */}
      <section>
        <article>
          <h1>Subtotal ({cart.reduce((acc, curr) => acc + curr.quantity, 0)} Items): ${cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)} </h1>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Cart;
