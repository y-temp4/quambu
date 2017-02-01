import React, { Component } from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import theme from '../../sass/theme/item.scss';

export default class item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, iconTitle, iconUrl} = this.props;

    const counts = `ストック：${item.stock_users.length}, ブックマーク：${item.bookmark_count}`;
    return (
      <a href={item.url} target="_blank" style={{width: '300px'}}>

        <ListItem
          theme={theme}
          avatar={iconUrl}
          caption={item.title}
          legend={`by ${item.user.url_name} | ${counts}`}
          selectable
          ripple />
      </a>
    );
  }
}
