import React, { useContext, useEffect, useState } from "react";
import { Store } from "./../Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import getError from "../Utility/getError";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../components/LoadingSpinner";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { nanoid } from "nanoid";
import { parseISO, format } from "date-fns";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [desc, setDesc] = useState(true);

  const sortOrder = () => {
    setOrders(orders.slice().reverse());
    setDesc((prev) => !prev);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/history", {
          headers: { authorization: `Bearer ${state.userInfo.token}` },
        });
        setLoading(false);
        setOrders(data.reverse());
      } catch (err) {
        setError(err);
        toast.error(getError(err));
      }
    };
    if (!state.userInfo) {
      navigate("/signin");
    } else {
      fetchOrders();
    }
  }, [state.userInfo, navigate]);

  return loading ? (
    <div>
      <LoadingSpinner />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <main className='container mx-auto flex flex-col items-center mb-20'>
      <Helmet>
        {" "}
        <title>Order History</title>
      </Helmet>
      <section className='space-y-4 max-w-2xl w-full px-2'>
        <div className='flex items-end justify-between space-x-4 pb-4'>
          <h1 className='text-2xl font-medium'>Order History</h1>
          {/* DESCENDING/ASCENDING SORT ORDER */}
          <button
            onClick={sortOrder}
            className='text-xs font-medium bg-gray-800 text-white rounded-full px-3 py-1 shadow'
            type='button'
          >
            {desc ? "Most Recent to Oldest" : "Oldest to Most Recent"}
          </button>
        </div>
        {/* Mobile Screens */}
        {orders.map((order) => (
          <article
            key={order._id}
            className='flex flex-col space-y-2 mx-auto min-w-fit w-4/5 sm:hidden'
          >
            {order.orderItems.map((item) => (
              <div className='flex space-x-2 items-center' key={nanoid()}>
                <img
                  className='w-20 h-20 object-cover block'
                  src={item.images[0]}
                  alt={item.name}
                />
                <div className='space-y-1 text-sm '>
                  <p className='font-semibold text-gray-800'>
                    {format(parseISO(order.createdAt), "LLLL d, yyyy")}
                  </p>
                  <p className='text-sky-600'>
                    <Link to={`/product/${item._id}`}>
                      {order.orderItems[0].color +
                        " " +
                        order.orderItems[0].name}
                      {" ..."}
                    </Link>
                  </p>
                  <p>
                    {order.isDelivered
                      ? "Delivered " +
                        format(parseISO(order.deliveredAt), "LLLL d, yyyy")
                      : "Not Delivered"}
                  </p>
                </div>
                <div>
                  <Link to={`/order/${order._id}`}>
                    <ArrowForwardIosOutlinedIcon fontSize='small' />
                  </Link>
                </div>
              </div>
            ))}
          </article>
        ))}
        {/* BROWSER SCREEN */}
        {orders.map((order) => (
          <article
            key={order._id}
            className='hidden sm:flex flex-col mx-auto justify-center max-w-xl space-y-4 shadow-md pb-4 rounded-lg'
          >
            {/* Header */}
            <div className='flex justify-between border bg-gray-800 text-white py-4 px-3 rounded-t-lg '>
              <p className='flex flex-col'>
                <span className='uppercase text-xs text-gray-300'>
                  Order Placed
                </span>
                {format(parseISO(order.createdAt), "LLLL d, yyyy")}
              </p>
              <p className='flex flex-col'>
                <span className='uppercase text-xs text-gray-300'>Total</span>$
                {order.price.total.toFixed(2)}
              </p>
              <p className='flex flex-col'>
                <span className='uppercase text-xs text-gray-300'>Order #</span>
                {order._id}
              </p>
            </div>
            {/* BODY */}
            <div className='flex flex-col px-3 space-y-1'>
              <div className='flex justify-between items-end'>
                <p className='font-bold text-lg text-gray-800'>
                  {order.isDelivered
                    ? "Delivered " +
                      format(parseISO(order.deliveredAt), "LLLL d, yyyy")
                    : "Not Delivered"}
                </p>
                <Link to={`/order/${order._id}`}>
                  <p className='text-sm text-sky-600 font-medium'>
                    View Order Details
                  </p>
                </Link>
              </div>
              <div className='flex flex-col gap-4'>
                {order.orderItems.map((item) => (
                  <div className='grid grid-cols-4 items-center' key={nanoid()}>
                    <img
                      className='w-20 h-20 object-cover block'
                      src={item.images[0]}
                      alt={item.name}
                    />

                    <p className='col-span-3 text-sm font-medium'>
                      <Link to={`/product/${item._id}`}>
                        {item.color + " " + item.name}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
              <p className='self-center justify-self-end'></p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default OrderHistory;
