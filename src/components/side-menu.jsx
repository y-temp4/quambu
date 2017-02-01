import React, { Component } from 'react';
import Drawer from 'react-toolbox/lib/drawer';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    this.props.toggleDrower();
  }

  render() {
    return (
      <Drawer active={this.props.active} onOverlayClick={this._handleToggle}>
        <h5>This is your Drawer.</h5>
        <p>You can embed any content you want, for example a Menu.</p>
      </Drawer>
    );
  }
}
