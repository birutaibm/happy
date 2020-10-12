import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import logo from '../assets/images/logo.svg';
import landing from '../assets/images/landing.svg';

import '../styles/pages/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <img src={logo} alt="Happy"/>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Brodowski</strong>
          <span>São Paulo</span>
        </div>
        <a href="" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.5)" />
        </a>
        <img src={landing} alt="crianças felizes" className="background"/>
      </div>
    </div>
  );
}

export default Landing;