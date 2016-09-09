import React, { Component } from 'react';

export default class item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, iconTitle, iconUrl} = this.props;
    return (
      <li>
        <a href={item.url} target="_blank" style={{marginRight: '1em'}}>
          <img src={iconUrl} width="30" height="30" title={iconTitle} />
          {item.title}
        </a>
        <span style={{marginRight: '1em'}}>
          ストック数：{item.stock_users.length}
        </span>
        <span>
          はてぶ数：{item.bookmark_count}
        </span>
      </li>
    );
  }
}
