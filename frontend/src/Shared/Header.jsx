import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div>
        <img src="/images/fetching-fashion-logo.png" alt="fetching fashion logo" />
      </div>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink>Winter Apparel</NavLink>
        <NavLink>Cart</NavLink>
        <NavLink>Profile</NavLink>
      </div>
    </nav>
  );
};

export default Header;
