import React, { Component } from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import Input from 'react-toolbox/lib/input';
import Slider from 'react-toolbox/lib/slider';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  _handleToggle() {
    this.props.toggleDrower();
  }

  _handleUserChange(userName) {
    this.props.fetchItemsByUserData(userName);
  }

  _handleCountChange(servise, value) {
    this.props.filterItemByCountChange(servise, value);
  }

  render() {
    const {active, userName, bookmarkCount, stockCount} = this.props;
    return (
      <Drawer
        active={active}
        onOverlayClick={this._handleToggle.bind(this)}>
        <section style={{padding: 10}}>
          <p>各種設定</p>
          <Input
            type='text'
            label='ユーザーID'
            value={userName}
            onChange={this._handleUserChange.bind(this)}/>
          <p>ブックマーク数</p>
          <Slider
            value={bookmarkCount}
            onChange={this._handleCountChange.bind(this, 'bookmark')}
            step={1}
            max={100}
            pinned
            editable/>
          <p>ストック数</p>
          <Slider
            value={stockCount}
            onChange={this._handleCountChange.bind(this, 'stock')}
            step={1}
            max={100}
            pinned
            editable/>
        </section>
      </Drawer>
    );
  }
}
