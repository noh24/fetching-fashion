import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import axios from "axios";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";
import Shipping from "./Shipping";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const [collapseCart, setCollapseCart] = useState(true);
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
    if (cart) {
      storeDispatch({ type: "CALCULATE_PRICE" });
    } else {
      navigate("/");
    }
  }, [
    userInfo,
    navigate,
    paypalDispatch,
    shippingAddress,
    storeDispatch,
    cart,
  ]);

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
        storeDispatch({ type: "CLEAR_CART" });
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
    <main className='max-w-4xl mb-10 lg:grid lg:auto-rows-fr lg:grid-cols-5 lg:gap-8 grid-cols-1 px-2 w-full relative'>
      <Helmet>
        <title>Fetching Fashion Checkout</title>
      </Helmet>
      <section className='col-span-3 space-y-4'>
        <Shipping />

        {/* CART */}
        <article className='space-y-4'>
          <h1
            className='text-2xl font-medium flex justify-between cursor-pointer'
            onClick={() => setCollapseCart((prev) => !prev)}
          >
            Cart{" "}
            <span>
              <KeyboardArrowDownOutlinedIcon />
            </span>
          </h1>
          {collapseCart ? (
            <div className='space-y-4'>
              {cart.map((item) => (
                <div key={item._id} className='flex gap-4 items-center'>
                  <img
                    className='w-24'
                    src={item.images[0]}
                    alt={`${item.color} ${item.name}`}
                  />
                  <div className='flex-1 flex flex-col'>
                    <Link to={`/product/${item._id}`}>
                      {item.color} {item.name}
                    </Link>
                    <div className='flex gap-2'>
                      <p>({item.quantity})</p>
                      <p>${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </article>
      </section>

      {/* Check out PAYMENTS */}
      <section className='col-span-2 space-y-4 mt-6 pt-4 sm:pt-0 sm:mt-0 sm:border-0 border-t-2 border-gray-800'>
        <h1 className='text-2xl font-medium'>Order Summary</h1>
        <article className='grid grid-cols-1'>
          <div className='flex justify-between'>
            <p>
              Items ({cart.reduce((acc, curr) => acc + curr.quantity, 0)}):{" "}
            </p>
            <p>{price.items ? "$" + price.items.toFixed(2) : " --"}</p>
          </div>
          <div className='flex justify-between'>
            <p>Shipping & handling: </p>
            <p className=''>
              {price.shipping ? "$" + price.shipping.toFixed(2) : " --"}
            </p>
          </div>
          <div className='flex justify-between'>
            <p>Estimated Tax: </p>
            <p>{price.tax ? "$" + price.tax.toFixed(2) : " --"}</p>
          </div>
          <div className='flex justify-between'>
            <p>
              <strong className='text-red-500'>Order Total: </strong>
            </p>
            <p>{price.total ? "$" + price.total.toFixed(2) : " --"}</p>
          </div>
          <div className='my-4 z-0'>
            {isPending ? (
              "Loading..."
            ) : (
              <PayPalButtons
                disabled={!shippingAddress.fullName}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Payment;
