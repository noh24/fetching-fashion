import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SharedLayout = () => {
  return (
    <div className='container mx-auto flex flex-col justify-between items-center min-h-screen w-full relative text-gray-500'>
      <ToastContainer position='bottom-center' index={1} />
      <Header />
      <div className='flex-1 w-full container mx-auto flex justify-center'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
