import React, { Fragment, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { Menu, Transition } from "@headlessui/react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { ToggleCartStore } from "../Utility/toggleCartStore.js";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    toggleCart: [, setToggleCart],
  } = useContext(ToggleCartStore);

  const { cart, userInfo } = state;

  const signOutHandler = () => {
    storeDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("price");
    toast.info("Successfully logged out");
    navigate("/signin");
  };
  const routeTo = (path) => {
    navigate(path);
  };

  const toggleModalCart = () => {
    setToggleCart((prev) => !prev);
  };

  return (
    <nav className='w-full flex items-center justify-between py-3 sm:py-4 lg:px-4 px-2 opacity-80 font-medium sticky top-0 z-50 bg-white border-b border-gray-200 mb-10 text-gray-800'>
      <div className=''>
        <Menu as='div' className='relative inline-block text-left z-10'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center rounded-md font-medium focus:outline-none capitalize'>
              <div className='sm:hidden'>
                <MenuIcon fontSize='small' />
              </div>
              <div className='sm:block hidden'>
                <MenuIcon fontSize='medium' />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute mt-2 sm:-mr-1 mr-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => routeTo("/")}
                      className={`${
                        active ? "bg-gray-800 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Home
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => routeTo("/products/winter-apparel")}
                      className={`${
                        active ? "bg-gray-800 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Winter Apparel
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* LOGO */}
      <div className='w-28 sm:w-40'>
        <NavLink to='/'>
          <img
            className='object-cover'
            src='/images/fetching-fashion-1.png'
            alt='fetching fashion logo'
          />
        </NavLink>
      </div>

      {/* Cart */}
      <section className='flex justify-center items-center gap-2 sm:gap-3 relative'>
        <div className='relative'>
          {/* <NavLink to='/cart'> */}
          <NavLink onClick={toggleModalCart}>
            <div className='sm:hidden'>
              <ShoppingBagOutlinedIcon fontSize='small' />
            </div>
            <div className='sm:block hidden'>
              <ShoppingBagOutlinedIcon fontSize='medium' />
            </div>
          </NavLink>
          {cart.length > 0 && (
            <span className='absolute flex items-center justify-center top-0 -right-1 text-gray-200 bg-gray-900 border-white -900 border-2 w-3 h-3 rounded-full text-xs'></span>
          )}
        </div>

        {/* Profile */}
        <Menu as='div' className='relative inline-block text-left z-10'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center rounded-md font-medium focus:outline-none capitalize'>
              <div className='sm:hidden'>
                <PersonIcon fontSize='small' />
              </div>
              <div className='sm:block hidden'>
                <PersonIcon fontSize='medium' />
              </div>
              {userInfo && (
                <span className='-ml-1'>
                  <KeyboardArrowDownOutlinedIcon
                    fontSize='small'
                    aria-hidden='true'
                  />
                </span>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            {userInfo ? (
              <Menu.Items className='absolute right-0 mt-2 sm:-mr-1 mr-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                      >
                        {userInfo && `${userInfo.name}`}
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => routeTo("/profile")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => routeTo("/orderhistory")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Order History
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={signOutHandler}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            ) : (
              <Menu.Items className='absolute right-0 mt-2 sm:-mr-1 mr-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => routeTo("/signin")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Sign In
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            )}
          </Transition>
        </Menu>
      </section>
    </nav>
  );
};

export default Header;
