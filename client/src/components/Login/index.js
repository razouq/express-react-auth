import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "./style.css";

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let res;
    try {
      res = await axios.post('/api/login', data);
    } catch(e) {
      console.log('e', e?.response?.data);
    }
    console.log('res', res);
  };

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h1 className="login__title">Login to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="username" type="text" ref={register} placeholder="email" />
          <input name="password" type="password" ref={register} placeholder="password" />
          <a href="#" className="login__link--forgot">
            forgot password
          </a>
          <button className="login__btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
