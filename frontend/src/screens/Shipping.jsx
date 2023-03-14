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
  const [addressState, setState] = useState(shippingAddress.state || "");
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
    storeDispatch({ type: "CALCULATE_PRICE" });
    navigate("/payment");
  };

  return (
    <main className='py-4 px-2 space-y-4 flex flex-col'>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <h1 className='text-2xl font-medium'>Shipping Address</h1>
      <form onSubmit={submitHandler} className='space-y-4'>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Full Name'
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        ></input>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='City'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='State / Province'
          value={addressState}
          required
          onChange={(e) => setState(e.target.value)}
        ></input>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Postal Code / Zip Code'
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <div>
          <button
            type='submit'
            className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full w-full shadow-sm hover:opacity-90'
          >
            Proceed to Payments
          </button>
        </div>
      </form>
    </main>
  );
};

export default Shipping;
