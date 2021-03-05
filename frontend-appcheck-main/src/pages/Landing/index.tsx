import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import admI from '../../assets/images/icons/adm.svg'
import funcI from '../../assets/images/icons/func.svg'

// import { Container } from './styles';

const Landing: React.FC = () => {
  return (<div id= "page-landing">
  <div id="page-landing-content" className="container">
      <div className= "logo-container">
          <h2>Plataforma de Gerenciamento.</h2></div>

      <div className = "buttons-container">
          <Link to = "Adm" className = "Adm">
          <img src = {admI} alt= "adm" />
          ADMINISTRAÇÃO </Link>

          <Link to = "Func" className = "Func">
          <img src = {funcI} alt= "func" />
          FUNCIONÁRIO </Link>

      </div>
      <span className = "bembrasil"> Rede Bem Brasil @ 2021</span>

  </div>
</div>);
}

export default Landing;
