import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "../Store";

const Header = () => {
  const { state, dispatch : storeDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    storeDispatch({ type: "USER_SIGNOUT"})
    localStorage.removeItem('cart')
    localStorage.removeItem('user')
    localStorage.removeItem('shippingAddress')
  }
  
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
          <button onClick={signOutHandler}>Sign out</button>
        ) : (
          <NavLink to='/signin'>Sign In</NavLink>
        )}
      </div>
      <div>
        <NavLink>Profile</NavLink>
      </div>
      <div>
        <NavLink>Order History</NavLink>
      </div>
    </nav>
  );
};

export default Header;
