import React, { Component, PropTypes } from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import theme from '../../sass/theme/item.scss';

export default class Item extends Component {

  render() {
    const { item, iconUrl } = this.props;
    const counts = `ストック：${item.stock_users.length}, ブックマーク：${item.bookmark_count}`;

    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        <ListItem
          theme={theme}
          avatar={iconUrl}
          caption={item.title}
          legend={`by ${item.user.url_name} | ${counts}`}
          selectable
          ripple
        />
      </a>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  iconUrl: PropTypes.string.isRequired,
};
