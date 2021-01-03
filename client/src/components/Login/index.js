import React from 'react';

import './style.css';

const Login = () => (
  <div className="wrapper">
    <div className="container">
      <h1 className="title">Login to your account</h1>
      <form>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <a href="#" className="link-forgot">forgot password</a>
        <button className="btn-login" type="submit">Login</button>
      </form>
    </div>
  </div>
);

export default Login;