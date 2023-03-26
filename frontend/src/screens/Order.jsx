import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { Store } from "../Store";
import getError from "../Utility/getError";
import { parseISO, format } from "date-fns";

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
    <div>
      <LoadingSpinner />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <main className='lg:grid lg:grid-cols-5 lg:gap-20 px-2 space-y-12 lg:space-y-20 mb-12'>
      <Helmet>
        <title>Order No. {params.id}</title>
      </Helmet>
      <section className='space-y-12 lg:col-span-3'>
        <h1 className='text-2xl font-medium uppercase text-gray-800'>Order # {params.id}</h1>
        <article className='space-y-2'>
          <h2 className='text-xl text-gray-800 font-medium'>Shipping Address</h2>
          <p>{order.shippingAddress.fullName}</p>
          <div>
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.state}, {order.shippingAddress.postalCode}{" "}
            {order.shippingAddress.country}
          </div>
          {order.isDelivered ? (
            <div className='uppercase'>
              <strong className='text-emerald-600'>Delivered </strong>{" "}
              {format(parseISO(order.deliveredAt), 'LLLL d, yyyy')}
            </div>
          ) : (
            <div className='uppercase '>
              <strong className='text-red-600'>Not delivered</strong>
            </div>
          )}
          {order.isPaid ? (
            <div className='uppercase'>
              <strong className='text-emerald-600'>Paid </strong>{" "}
              {format(parseISO(order.paidAt), 'LLLL d, yyyy')}
            </div>
          ) : (
            <div className='uppercase'>
              <strong className='text-red-600'>Not paid</strong> 
            </div>
          )}
        </article>

        <article className='space-y-4'>
          <h1 className='text-xl font-medium text-gray-800'>Order Items</h1>
          <div className='space-y-4'>
            {order.orderItems.map((item) => (
              <div key={item._id} className='flex space-x-4'>
                <img
                  className='w-24 object-cover'
                  src={item.images[0]}
                  alt={`${item.color} ${item.name}`}
                />
                <div className='flex flex-col justify-center gap-1 font-medium'>
                  <Link to={`/product/${item._id}`} className='font-medium text-sm'>
                    {item.color} {item.name}
                  </Link>
                  <p className='text-gray-400 tracking-widest'>({item.quantity ? item.quantity : 1})</p>
                  <p className='text-emerald-600 font-medium'>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className='lg:col-span-2 space-y-2 border-t-2 pt-4 lg:pt-0 border-gray-400 lg:border-none font-medium'>
        <h1 className='text-xl text-gray-800 font-medium'>Order Summary</h1>
        <article className='space-y-2 uppercase'>
          <div className='grid grid-cols-3'>
            <p className='text-sm'>Items</p>
            <p className='col-start-3'>${order.price.items.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3'>
            <p className='text-sm'>Shipping</p>
            <p className='col-start-3'>${order.price.shipping.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3'>
            <p className='text-sm'>Tax</p>
            <p className='col-start-3'>${order.price.tax.toFixed(2)}</p>
          </div>
          <div className='grid grid-cols-3 border-t-2 pt-2'>
            <p className='text-red-600'>
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
