import React from 'react';
import logo from '../assets/azzainLogo.png';

const Overlay = () => {
  return (
    <div className="glassmorphism-container">
      <div className="glassmorphism-effect">
        <div className='logo'>
        <img src={logo} alt="Azzain Ink Logo" />
        </div> 
        <div class="wrapper-title">
          <h1 class="title">Welcome to <span>AzzainInk</span></h1>
        </div>
      <div class="wrap">
      <button class="button">START</button>
      </div>
      </div>
    </div>  );
}

export default Overlay;
