import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => (
  <div className="navigation">
    <Link to="/" >Clients</Link>
    <Link to="/new">Registration</Link>
  </div>
);

export default NavigationMenu;
