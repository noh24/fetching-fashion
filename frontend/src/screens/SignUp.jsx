import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../Utility/getError";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch: storeDispatch } = useContext(Store);

  useEffect(() => {
    if (state.userInfo) {
      navigate(redirect);
    }
  }, [state.userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password doesn't match");
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      storeDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Successfully signed up");
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <main className='py-4 px-2 space-y-4 flex flex-col'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='text-2xl font-medium'>Sign Up</h1>
      <form onSubmit={submitHandler} className='space-y-4'>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Name'
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='email'
          placeholder='Email Address'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='password'
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='password'
          placeholder='Confirm Password'
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <button
            type='submit'
            className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full w-full shadow-sm hover:opacity-90'
          >
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already a Customer?{" "}
        <Link
          to={`/signin?redirect=${redirect}`}
          className='underline text-gray-800'
        >
          Sign In
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
