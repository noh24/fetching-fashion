import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import axios from "axios";
import getError from "../utility/getError";

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { shippingAddress, userInfo, cart, price } = state;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    if (!shippingAddress) {
      navigate("/shipping");
    }
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/keys/paypal", {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [userInfo, navigate, paypalDispatch]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: price.total },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        const { data } = await axios.post(
          `/api/orders/`,
          {
            details,
            orderItems: cart,
            shippingAddress,
            price,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        toast.success("Order is complete");
        storeDispatch({ type: "CART_CLEAR" });
        localStorage.removeItem("cart");
        navigate(`/order/${data.order._id}`);
      } catch (err) {
        toast.error(getError(err));
      }
    });
  };
  const onError = (err) => {
    toast.error(getError(err));
  };

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
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <div>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Payment;
