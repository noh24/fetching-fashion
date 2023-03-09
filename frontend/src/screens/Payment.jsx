import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { shippingAddress, userInfo, cart, price } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
  }, [userInfo, navigate])
  return (
    <main>
      <section>
        {/* shipping address */}
        <article>
          <h1>Shipping Address</h1>
          <p>
            <strong>Name: </strong> {shippingAddress.fullName}
          </p>
          <div>
            <strong>Address: </strong> {shippingAddress.address},{" "}
            {shippingAddress.city} {shippingAddress.state},{" "}
            {shippingAddress.postalCode} {shippingAddress.country}
          </div>
          <p>
            <Link to='/shipping'>Edit Shipping Address</Link>
          </p>
        </article>
        {/* CART */}
        <article>
          <h1>Cart</h1>
          <div>
            {cart.map((item) => (
              <div key={item._id}>
                <img src={item.images[0]} alt={`${item.color} ${item.name}`} />
                <Link to={`/product/${item._id}`}>
                  {item.color} {item.name}
                </Link>
                <p>{item.quantity}</p>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
          <p>
            <Link to='/cart'>Edit Cart</Link>
          </p>
        </article>
      </section>
      {/* Check out PAYMENTS */}
      <section>
        <article>
          <h1>Order Summary</h1>
          <div>
            <p>Items</p>
            <p>${price.items.toFixed(2)}</p>
          </div>
          <div>
            <p>Shipping</p>
            <p>${price.shipping.toFixed(2)}</p>
          </div>
          <div>
            <p>Tax</p>
            <p>${price.tax.toFixed(2)}</p>
          </div>
          <div>
            <p>Total</p>
            <p>${price.total.toFixed(2)}</p>
          </div>
          <button>Paypal</button>
        </article>
      </section>
    </main>
  );
};

export default Payment;
// placing order creates an order item
// order item consists of cart [ product details], shipping address,
// payment method, payment result, item+shipping+tax=totalprice, isPaid, paidAt, isDelivered

// most of these are in context store

// order screen allows users to pay for their order

// goal: eliminate payment method screen and placing order screen. collect payment and go straight to order screen

// payment screen shows: shipping address (editable), items in the cart (editable), price, call to action(paypal)

// paypal:
