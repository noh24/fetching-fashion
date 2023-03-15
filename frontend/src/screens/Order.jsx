import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../utility/getError";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({});
  const params = useParams();
  const { state } = useContext(Store);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${params.id}`, {
          headers: { authorization: `Bearer ${state.userInfo.token}` },
        });
        setLoading(false);
        setOrder(data);
      } catch (err) {
        setError(err);
        toast.error(getError(err));
      }
    };
    if (!order._id || (order._id && order._id !== params.id)) {
      fetchData();
    }
  }, [params.id, state.userInfo, order._id]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <main className='lg:grid lg:grid-cols-6 lg:gap-8 px-2 space-y-4 lg:space-y-12'>
      <Helmet>
        <title>Order No. {params.id}</title>
      </Helmet>
      <section className='space-y-4 lg:col-span-3'>
        <h1 className='text-2xl font-light'>Order No. {params.id}</h1>
        <article className='space-y-2'>
          <h2 className='text-lg font-medium'>Shipping Address</h2>
          <p>
            <strong>Name: </strong> {order.shippingAddress.fullName}
          </p>
          <div>
            <strong>Address: </strong> {order.shippingAddress.address},{" "}
            {order.shippingAddress.city} {order.shippingAddress.state},{" "}
            {order.shippingAddress.postalCode} {order.shippingAddress.country}
          </div>
          {order.isDelivered ? (
            <div>
              <strong>Delivered at:</strong>{" "}
              {new Date(order.deliveredAt).toLocaleString()}
            </div>
          ) : (
            <div>
              <strong>Delivery Status:</strong> Not delievered
            </div>
          )}
          {order.isPaid ? (
            <div>
              <strong>Paid on:</strong>{" "}
              {new Date(order.paidAt).toLocaleString()}
            </div>
          ) : (
            <div>
              <strong>Payment Status:</strong> Not paid
            </div>
          )}
        </article>

        <article>
          <h1 className='text-lg font-medium'>Order Items</h1>
          <div className='space-y-4'>
            {order.orderItems.map((item) => (
              <div key={item._id} className='flex space-x-4'>
                <img
                  className='w-24 object-cover'
                  src={item.images[0]}
                  alt={`${item.color} ${item.name}`}
                />
                <div className='flex flex-col'>
                  <Link to={`/product/${item._id}`} className='font-medium'>
                    {item.color} {item.name}
                  </Link>
                  <p>({item.quantity ? item.quantity : 1})</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className='lg:col-span-2 space-y-2'>
        <h1 className='text-lg font-medium'>Order Summary</h1>
        <article className='space-y-2 text-gray-800'>
          <div className='grid grid-cols-3'>
            <p>Items</p>
            <p className='col-start-3'>${order.price.items.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3'>
            <p>Shipping</p>
            <p className='col-start-3'>${order.price.shipping.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3'>
            <p>Tax</p>
            <p className='col-start-3'>${order.price.tax.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3 border-t-2 pt-2'>
            <p className='text-red-500'>
              <strong>Order Total</strong>
            </p>
            <p className='col-start-3'>${order.price.total.toFixed(2)}</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Order;
