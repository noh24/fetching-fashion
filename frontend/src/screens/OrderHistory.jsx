import React, { useContext, useEffect, useState } from "react";
import { Store } from "./../Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import getError from "./../utility/getError";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [desc, setDesc] = useState(true);

  const sortOrder = () => {
    setOrders(orders.slice().reverse());
    setDesc(prev => !prev);
  }

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
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <main className='container mx-auto flex flex-col items-center mb-20'>
      <Helmet>
        {" "}
        <title>Order History</title>
      </Helmet>
      <section className='space-y-4'>
        <div className='flex items-end justify-between space-x-4'>
          <h1 className='text-2xl font-medium'>Order History</h1>
          <button onClick={sortOrder} className='text-xs bg-gray-800 text-white rounded-full px-2 py-1 shadow' type='button'>{desc ? "Most Recent to Oldest" : "Oldest to Most Recent"}</button>
        </div>
        <section key={orders} className='space-y-4 flex flex-col lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-4'>
          {orders.map((order) => (
            <div
              key={order._id}
              className='rounded-lg px-12 py-8 shadow-sm shadow-gray-400 font-light hover:scale-105 bg-white'
            >
              <Link to={`/order/${order._id}`} className='space-y-2'>
                <p className='font-medium'>
                  <strong>Order Date: </strong>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Order Id: </strong>
                  {order._id}
                </p>
                <p>
                  <strong>Payment Date: </strong>
                  {new Date(order.paidAt).toLocaleString()}
                </p>
                <p>
                  <strong>Total: </strong>${order.price.total.toFixed(2)}
                </p>
                <p>
                  <strong>Delivered : </strong>
                  {order.isDelivered
                    ? new Date(order.deliveredAt).toLocaleString()
                    : "No"}
                </p>
              </Link>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default OrderHistory;
