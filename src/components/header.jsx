import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Button, IconButton } from 'react-toolbox/lib/button';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    this.props.toggleDrower();
  }

  render() {
    return (
      <AppBar fixed flat>
        <IconButton icon={'dehaze'} onClick={this._handleToggle} style={{color: 'white'}}/>
        <a href="/">Quambu</a>
        <Navigation />
      </AppBar>
    );
  }
}
