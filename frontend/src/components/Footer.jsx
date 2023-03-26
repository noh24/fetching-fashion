import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import emailValidator from "./../Utility/emailValidator";

const Footer = () => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (emailValidator(email)) {
      toast.success("Thank you for subscribing to our mailing list.");
      setEmail("");
    } else {
      toast.error("Enter a valid email to subscribe");
    }
  };
  return (
    <section className='w-full mt-32 px-2 flex flex-col bg-gray-800 text-white py-4 lg:pb-12 lg:pt-8'>
      <article className='lg:grid lg:grid-cols-5 lg:gap-8 flex flex-col justify-between items-center h-full space-y-8 lg:space-y-0'>
        {/* LOGO */}
        <div className='lg:col-start-2 lg:col-span-1 flex flex-col justify-between items-center h-full pt-4'>
          <img
            className='object-cover w-56 -mt-4 invert'
            src='/images/fetching-fashion-1.png'
            alt='fetching fashion logo'
          />
          <small className='hidden lg:flex'>
            Copyright &copy; 2023. All rights reserved.
          </small>
        </div>
        {/* LINKS */}
        <div className='grid grid-cols-2 col-span-1 lg:gap-0 gap-12'>
          <div className='flex justify-center'>
            <div className='flex flex-col gap-1'>
              <Link className='hover:opacity-80' to='/'>Home</Link>
              <Link className='hover:opacity-80' to='/products/winter-apparel'>Winter Apparel</Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col gap-1'>
              <Link className='hover:opacity-80' to='/signin'>Sign In</Link>
              <Link className='hover:opacity-80' to='/signup'>Sign Up</Link>
              <Link className='hover:opacity-80' to='/profile'>My Profile</Link>
              <Link className='hover:opacity-80' to='/orderhistory'>Order History</Link>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className='lg:col-span-1 flex flex-col'>
          <h1 className='font-medium text-lg text-white'>Let's Stay Connected</h1>
          <p className='text-gray-400'>Enter your email to unlock 10% OFF.</p>
          <form onSubmit={submitHandler} className='mt-4 flex-nowrap flex flex-auto'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email-address'
              className='py-2 px-4 border border-gray-300 rounded-full rounded-r-none focus:outline-none'
            />
            <button
              className=' shadow-sm shadow-gray-600 border-t-2 rounded-full rounded-l-none py-2 px-4 bg-gray-800 text-white border border-gray-600 focus:outline-none hover:opacity-80'
              type='submit'
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* COPYRIGHT FOR MOBILE */}
        <small className='lg:hidden'>
          Copyright &copy; 2023. All rights reserved.{" "}
        </small>
      </article>
    </section>
  );
};

export default Footer;
