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
  const { state, dispatch } = useContext(Store);

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
    <main>
      <Helmet>
        <title>Order No. {params.id}</title>
      </Helmet>
      <h1>Order No. {params.id}</h1>
      <section>
        <article>
          <h1>Shipping Address</h1>
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
        </article>

        <article>
          <h1>Order Items</h1>
          <div>
            {order.orderItems.map((item) => (
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
        </article>
      </section>

      <section>
        <article>
          <h1>Order Summary</h1>
          <div>
            <p>Items</p>
            <p>${order.price.items.toFixed(2)}</p>
          </div>
          <div>
            <p>Shipping</p>
            <p>${order.price.shipping.toFixed(2)}</p>
          </div>
          <div>
            <p>Tax</p>
            <p>${order.price.tax.toFixed(2)}</p>
          </div>
          <div>
            <p>
              <strong>Order Total</strong>
            </p>
            <p>${order.price.total.toFixed(2)}</p>
          </div>
          {order.isPaid ? (
            <div>
              <strong>Paid at:</strong>{" "}
              {new Date(order.paidAt).toLocaleString()}
            </div>
          ) : (
            <div>
              <strong>Payment Status:</strong> Not paid
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Order;
