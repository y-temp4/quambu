import React, { Component } from 'react';
import { ListItem } from 'react-toolbox/lib/list';

export default class item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, iconTitle, iconUrl} = this.props;
    const counts = `ス：${item.stock_users.length} は：${item.bookmark_count}`;
    return (
      <a href={item.url} target="_blank">
        <ListItem
          avatar={iconUrl}
          caption={item.title}
          legend={`by ${item.user.url_name}`}
          rightIcon={counts}
          selectable
          ripple
          />
      </a>
    );
  }
}
