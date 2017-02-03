import React, { Component } from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import Input from 'react-toolbox/lib/input';
import Slider from 'react-toolbox/lib/slider';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmark_count: 0,
      stock_count: 0
    };
  }

  _handleToggle() {
    this.props.toggleDrower();
  }

  _handleChange(slider, value) {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  }

  render() {
    return (
      <Drawer
        active={this.props.active}
        onOverlayClick={this._handleToggle.bind(this)}>
        <section style={{padding: 10}}>
          <p>各種設定</p>
          <Input type='text' label='ユーザーID'/>
          <p>ブックマーク数</p>
          <Slider
            value={this.state.bookmark_count}
            onChange={this._handleChange.bind(this, 'bookmark_count')}
            step={1}
            max={100}
            pinned
            editable/>
          <p>ストック数</p>
          <Slider
            value={this.state.stock_count}
            onChange={this._handleChange.bind(this, 'stock_count')}
            step={1}
            max={100}
            pinned
            editable/>
        </section>
      </Drawer>
    );
  }
}
