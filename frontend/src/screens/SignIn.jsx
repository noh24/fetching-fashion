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
  const { state, dispatch : storeDispatch } = useContext(Store);
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
      localStorage.setItem("user", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <main>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1>Sign In</h1>
      <section>
        <form onSubmit={submitHandler}>
          <input
            type='email'
            placeholder='Email Address'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <p>
          New Customer? <Link to='/signup'>Sign Up</Link>
        </p>
      </section>
    </main>
  );
};

export default SignIn;
