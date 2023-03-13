import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getError from "./../utility/getError";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "./../Store";

const SignIn = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      storeDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
      toast.success("Successfully sign in");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const demoAccount = () => {
    setEmail("demo@example.com");
    setPassword("123456");
  };

  return (
    <main className='py-4 px-2 space-y-4 flex flex-col'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='text-2xl font-medium'>Sign In</h1>
      <form onSubmit={submitHandler} className='space-y-4'>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='email'
          placeholder='Email Address'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex gap-4'>
          <button
            className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full w-full shadow-sm hover:opacity-90'
            type='submit'
          >
            Sign In
          </button>
          <button
            className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full w-full shadow-sm hover:opacity-90'
            type='submit'
            onClick={demoAccount}
          >
            Demo Account
          </button>
        </div>
      </form>
      <p>
        New Customer? <Link to='/signup?redirect=/shipping' className='underline text-gray-800'>Sign Up</Link>
      </p>
    </main>
  );
};

export default SignIn;
