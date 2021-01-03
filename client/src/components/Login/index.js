import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "./style.css";

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.get('/api');
    console.log(res);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">Login to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" type="text" ref={register} placeholder="email" />
          <input name="password" type="password" ref={register} placeholder="password" />
          <a href="#" className="link-forgot">
            forgot password
          </a>
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
