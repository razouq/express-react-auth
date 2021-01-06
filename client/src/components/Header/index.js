import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';

function Header(props) {
  return (
    <div className="header__container">
      <Link class="header__logo">Logo</Link>
      <div className="header__links">
        <Link to='/login' className="header__link">Login</Link>
        <Link to='/signup' className="header__link">Signup</Link>
      </div>
    </div>
  );
}

export default Header;