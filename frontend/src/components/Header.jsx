import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "../Store";

const Header = () => {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    storeDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("price");
  };

  return (
    <nav>
      <NavLink to='/'>
        <img
          src='/images/fetching-fashion-logo.png'
          alt='fetching fashion logo'
        />
      </NavLink>
      <div>
        <NavLink to='/'>Home</NavLink>
      </div>
      <div>
        <NavLink to='/products/winter-apparel'>Winter Apparel</NavLink>
      </div>
      <div>
        <NavLink to='/cart'>Cart</NavLink>
        <span>
          {cart.length > 0 &&
            cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        </span>
      </div>
      <div>
        {userInfo ? (
          <div>
            <p>{userInfo.name}</p>
            <p>
              <NavLink>Profile</NavLink>
            </p>
            <p>
              <NavLink>Order History</NavLink>
            </p>
            <p>
              <button onClick={signOutHandler}>Sign out</button>
            </p>
          </div>
        ) : (
          <NavLink to='/signin'>Sign In</NavLink>
        )}
      </div>
      <div></div>
      <div></div>
    </nav>
  );
};

export default Header;
