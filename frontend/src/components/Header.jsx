import React, { Fragment, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { Menu, Transition } from "@headlessui/react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
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

  return (
    <nav className='container flex items-center justify-between py-3 sm:py-4 px-2 font-medium'>
      <div className=''>
        <Menu as='div' className='relative inline-block text-left z-10'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center rounded-md font-medium focus:outline-none capitalize'>
              <div className=''>
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

      <div className='w-28 sm:w-40'>
        <NavLink to='/'>
          <img
            className='object-cover'
            src='/images/fetching-fashion-1.png'
            alt='fetching fashion logo'
          />
        </NavLink>
      </div>

      <section className='flex justify-center items-center gap-2 relative'>
        <div>
          <div className=''>
            <NavLink to='/cart'>
              <ShoppingBagOutlinedIcon fontSize='medium' />
            </NavLink>
          </div>
          <span>
            {cart.length > 0 &&
              cart.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        </div>

        <Menu as='div' className='relative inline-block text-left z-10'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center rounded-md font-medium focus:outline-none capitalize'>
              <div className=''>
                <PersonIcon fontSize='medium' />
              </div>
              {userInfo && (
                <div>
                  <KeyboardArrowDownOutlinedIcon
                    fontSize='small'
                    aria-hidden='true'
                  />
                </div>
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
              <Menu.Items className='absolute right-0 mt-2 sm:-mr-1 mr-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
                        User Profile
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
