import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Shipping = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { userInfo, cart, shippingAddress } = state;
  const [toggleShipping, setToggleShipping] = useState(true);

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
    if (shippingAddress.fullName) {
      setToggleShipping(false);
    } 
  }, [userInfo, navigate, cart, shippingAddress]);

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
    toggleShippingHandler();
  };

  const toggleShippingHandler = () => {
    setToggleShipping((prev) => !prev);
  };

  return (
    <main className='space-y-4 flex flex-col w-full'>
      <h1
        onClick={toggleShippingHandler}
        className='text-2xl font-medium flex justify-between cursor-pointer'
      >
        <span>Shipping Address</span> <KeyboardArrowDownOutlinedIcon />
      </h1>
      {toggleShipping ? (
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
              Save Shipping Address
            </button>
          </div>
        </form>
      ) : (
        <article>
          <p>
            <strong>Name: </strong> {shippingAddress.fullName}
          </p>
          <div>
            <strong>Address: </strong> {shippingAddress.address},{" "}
            {shippingAddress.city} {shippingAddress.state},{" "}
            {shippingAddress.postalCode} {shippingAddress.country}
          </div>
        </article>
      )}
    </main>
  );
};

export default Shipping;
