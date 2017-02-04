import React, { Component, PropTypes } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { IconButton } from 'react-toolbox/lib/button';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.toggleDrower();
  }

  render() {
    return (
      <AppBar fixed flat>
        <IconButton icon={'dehaze'} onClick={this.handleToggle} style={{ color: 'white' }} />
        <a href="/">Quambu</a>
        <Navigation />
      </AppBar>
    );
  }
}

Header.propTypes = {
  toggleDrower: PropTypes.func.isRequired,
};
