import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../utility/getError";

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
    <main>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </form>
      <p>
        Already a Customer?{" "}
        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
      </p>
    </main>
  );
};

export default SignUp;
