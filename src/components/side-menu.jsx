import React, { Component, PropTypes } from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import Input from 'react-toolbox/lib/input';
import Slider from 'react-toolbox/lib/slider';

export default class SideMenu extends Component {

  handleToggle() {
    this.props.toggleDrower();
  }

  handleUserChange(userName) {
    this.props.fetchItemsByUserData(userName);
  }

  handleCountChange(servise, value) {
    this.props.filterItemByCountChange(servise, value);
  }

  render() {
    const { active, userName, bookmarkCount, stockCount } = this.props;

    return (
      <Drawer
        active={active}
        onOverlayClick={this.handleToggle.bind(this)}
      >
        <section style={{ padding: 10 }}>
          <p>各種設定</p>
          <Input
            type={'text'}
            label={'ユーザーID'}
            value={userName}
            onChange={this.handleUserChange.bind(this)}
          />
          <p>ブックマーク数</p>
          <Slider
            value={bookmarkCount}
            onChange={this.handleCountChange.bind(this, 'bookmark')}
            step={1}
            max={100}
            pinned
            editable
          />
          <p>ストック数</p>
          <Slider
            value={stockCount}
            onChange={this.handleCountChange.bind(this, 'stock')}
            step={1}
            max={100}
            pinned
            editable
          />
        </section>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  bookmarkCount: PropTypes.number.isRequired,
  stockCount: PropTypes.number.isRequired,
  toggleDrower: PropTypes.func.isRequired,
  fetchItemsByUserData: PropTypes.func.isRequired,
  filterItemByCountChange: PropTypes.func.isRequired,
};
