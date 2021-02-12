import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";

import "./style.css";

const Signup = () => {
  const [apiError, setApiError] = useState(null);
  const { handleSubmit, register, errors } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    let res;
    try {
      res = await axios.post("/api/signup", data);
      history.push('/login');
    } catch (e) {
      setApiError(e.response?.data?.message);
      console.log("e", e?.response?.data);
    }
    console.log("res", res);
  };
  console.log(errors);
  return (
    <div className="signup__wrapper">
      <div className="signup__container">
        <h1 className="signup__title">Create new Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="firstname"
            type="text"
            ref={register}
            placeholder="firstname"
          />
          <input
            name="lastname"
            type="text"
            ref={register}
            placeholder="lastname"
          />
          <input
            name="username"
            type="email"
            ref={register}
            placeholder="email"
          />
          <input
            name="password"
            type="password"
            ref={register}
            placeholder="password"
          />
          <button className="signup__btn" type="submit">
            Signup
          </button>

          {apiError !== null && <div className="login__error">{apiError}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
