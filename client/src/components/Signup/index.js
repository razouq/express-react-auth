import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import './style.css';

const Signup = () => {

  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let res;
    try {
      res = await axios.post('/api/signup', data);
    } catch(e) {
      console.log('e', e?.response?.data);
    }
    console.log('res', res);
  };
  return (
    <div className="signup__wrapper">
      <div className="signup__container">
        <h1 className="signup__title">Create new Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="firstname" type="text" ref={register} placeholder="firstname" />
          <input name="lastname" type="text" ref={register} placeholder="lastname" />
          <input name="username" type="email" ref={register} placeholder="email" />
          <input name="password" type="password" ref={register} placeholder="password" />
          <a href="#" className="signup__link--forgot">
            forgot password
          </a>
          <button className="signup__btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;