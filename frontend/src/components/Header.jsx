import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <NavLink to='/'>
        <img src="/images/fetching-fashion-logo.png" alt="fetching fashion logo" />
      </NavLink>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products/winter-apparel'>Winter Apparel</NavLink>
        <NavLink to='/cart'>Cart</NavLink>
        <NavLink>Profile</NavLink>
      </div>
    </nav>
  );
};

export default Header;
