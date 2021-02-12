import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./style.css";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const [apiError, setApiError] = useState(null);

  const history = useHistory();

  const onSubmit = async (data) => {
    let res;
    try {
      res = await axios.post("/api/login", data);
      history.push("/");
    } catch (e) {
      console.log("e", e?.response?.data);
      setApiError(e.response?.data?.message);
    }
    console.log("res", res);
  };
  console.log(errors);

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h1 className="login__title">Login to your account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="username"
            type="text"
            ref={register({ required: true })}
            placeholder="email"
          />
          {errors.username?.type === "required" && (
            <div className="login__error">username is required</div>
          )}
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
            placeholder="password"
          />
          {errors.password?.type === "required" && (
            <div className="login__error">password is required</div>
          )}
          <a href="#" className="login__link--forgot">
            forgot password
          </a>

          <button className="login__btn" type="submit">
            Login
          </button>
          {apiError !== null && <div className="login__error">{apiError}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
