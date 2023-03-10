import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [openMenu, setOpenMenu] = useState(false);
  const signOutHandler = () => {
    storeDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("price");
    toast.info("Successfully logged out");
    navigate("/signin");
  };

  const dropMenu = useRef(null);
  
  const handleMouseDown = (e) => {
    if (dropMenu.current && !dropMenu.current.contains(e.target)) {
      setOpenMenu(false);
    }
  };
  document.addEventListener("mousedown", handleMouseDown);

  return (
    <nav className='container flex items-center justify-between px-4 font-medium'>
      <div className='w-40'>
        <NavLink to='/'>
          <img
            src='/images/fetching-fashion-logo.png'
            alt='fetching fashion logo'
          />
        </NavLink>
      </div>

      <section className='flex justify-center items-center gap-2 relative'>
        <div>
          <NavLink to='/cart'>Cart</NavLink>
          <span>
            {cart.length > 0 &&
              cart.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        </div>

        <div>
          <div className=''>
            <NavLink to='/products/winter-apparel'>Products</NavLink>
          </div>
        </div>

        <div
          className='flex cursor-pointer items-center'
          onClick={userInfo ? () => setOpenMenu((prev) => !prev) : null}
        >
          {userInfo ? (
            <p>
              {userInfo.name}
              <ArrowDropDownIcon fontSize='small' />
            </p>
          ) : (
            <NavLink to='/signin'>Sign In</NavLink>
          )}
        </div>

        <div
          ref={dropMenu}
          className={
            openMenu
              ? "absolute flex flex-col z-20 top-10 left-2 bg-neutral-100 min-w-full text-right px-2 py-2 rounded space-y-1"
              : "hidden"
          }
        >
          <NavLink to={"/profile"}>User Profile</NavLink>
          <NavLink to={"/orderhistory"}>Order History</NavLink>
          <hr />
          <NavLink to={"#signout"} onClick={signOutHandler}>
            Sign Out
          </NavLink>
        </div>
      </section>
    </nav>
  );
};

export default Header;
