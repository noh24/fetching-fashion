import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCart from "../screens/ModalCart";
import { Transition } from "@headlessui/react";
import { ToggleCartStore } from "../Utility/toggleCartStore";

const SharedLayout = () => {
  const {
    toggleCart: [toggleCart, setToggleCart],
  } = useContext(ToggleCartStore);

  return (
    <div
      className={`${
        toggleCart
          ? "h-screen overflow-hidden"
          : " flex flex-col justify-between items-center min-h-screen w-full relative text-gray-500"
      }  `}
    >
      <ToastContainer position='bottom-center' index={1} />
      <Header />
      <div
        className={`${
          toggleCart
            ? "block transition transform ease-in duration-1000"
            : "hidden"
        } fixed top-0 z-50 w-full min-h-screen bg-gray-800 bg-opacity-50`}
      >
        <Transition
          show={toggleCart}
          enter='transition-opacity transition transform ease-in duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ModalCart toggleCart={setToggleCart} />
        </Transition>
      </div>
      <div className='flex-1 w-full container mx-auto flex justify-center min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
