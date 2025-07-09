import React from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-title'>
        <h2>Food Delivery</h2>
        <p className='admin-panel-text'>Admin Panel</p>
      </div>
      <img src={assets.profile_image} alt="Profile" className="profile" />
    </div>
  );
}

export default Navbar;
