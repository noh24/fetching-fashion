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
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/history", {
          headers: { authorization: `Bearer ${state.userInfo.token}` },
        });
        setLoading(false);
        setOrders(data);
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
    <main>
      <Helmet>
        {" "}
        <title>Order History</title>
      </Helmet>
      {orders.reverse().map((order) => (
        <div key={order._id}>
          <Link to={`/order/${order._id}`}>
            <p>
              <strong>Order Id: </strong>
              {order._id}
            </p>
          </Link>
          <p>
            <strong>Order Date: </strong>
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total: </strong>${order.price.total.toFixed(2)}
          </p>
          <p>
            <strong>Payment Date: </strong>
            {new Date(order.paidAt).toLocaleString()}
          </p>
          <p>
            <strong>Delivered : </strong>
            {order.isDelivered
              ? new Date(order.deliveredAt).toLocaleString()
              : "No"}
          </p>
        </div>
      ))}
    </main>
  );
};

export default OrderHistory;
