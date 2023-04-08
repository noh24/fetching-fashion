import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../Utility/getError";

const Profile = () => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!state.userInfo) {
      navigate("/signin?redirect=/profile");
    } else {
      setName(state.userInfo.name);
      setEmail(state.userInfo.email);
    }
  }, [state.userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Enter a matching password");
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        { headers: { authorization: `Bearer ${state.userInfo.token}` } }
      );
      storeDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Successfully updated user");
      navigate("/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <section className='py-4 px-2 space-y-4 flex flex-col'>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <h1 className='text-2xl font-medium'>My Profile</h1>
      <form onSubmit={submitHandler} className='space-y-4'>
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='email'
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className='py-2 px-3 w-full border border-gray-300 rounded-full focus:outline-none'
          type='password'
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <button
            type='submit'
            className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full w-full shadow-sm hover:opacity-90'
          >
            Update Profile
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
