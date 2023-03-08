import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

const Shipping = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { userInfo, cart, shippingAddress } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [addressState, setState] = useState(shippingAddress.state || "")
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (cart <= 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate, cart]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      fullName,
      address,
      city,
      state: addressState,
      postalCode,
      country,
    };
    storeDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: userShippingAddress,
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(userShippingAddress)
    );
    navigate("/payment");
  };

  return (
    <main>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Full Name'
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='Address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='City'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='State / Province'
          value={addressState}
          required
          onChange={(e) => setState(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='Postal Code / Zip Code'
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='Country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <div>
          <button type='submit'>Proceed to Payments</button>
        </div>
      </form>
    </main>
  );
};

export default Shipping;
