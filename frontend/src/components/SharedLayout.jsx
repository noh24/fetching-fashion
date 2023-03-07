import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SharedLayout = () => {
  return (
    <div>
      <ToastContainer position='bottom-center' index={1} />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
