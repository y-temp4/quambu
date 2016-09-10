import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';

const Header = () => (
  <AppBar fixed flat>
    <a href="/home">React Toolbox Docs</a>
    <Navigation />
  </AppBar>
);

export default Header;
