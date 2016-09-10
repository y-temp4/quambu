import React, { Component } from 'react';
import Item from './item';
import { List } from 'react-toolbox/lib/list';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  // ブックマーク数とストック数で表示する記事を絞り込む
  _refineByCount(item, bookmark_count, stock_count) {
    return bookmark_count <= item.bookmark_count && stock_count <= item.stock_users.length
  }

  render() {
    const {items, refineByBookmark, refineByStock, icon, hasSubData, message} = this.props;
    if (!hasSubData) {
      return <span>{message}</span>;
    } else {
      return (
        <List>
          {
            items.map((item) => {
              if (item.bookmark_count === undefined ||
                this._refineByCount(item, refineByBookmark, refineByStock)) {
                if (icon === 'tag') {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      iconTitle={item.tags[0].name}
                      iconUrl={item.tags[0].icon_url} />
                  );
                } else {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      iconTitle={item.user.url_name}
                      iconUrl={item.user.profile_image_url} />
                  )
                }
              }
            })
          }
        </List>
      );
    }
  }
}

ItemList.defaultProps = {
  hasSubData: false,
  message: '記事がありません'
}
