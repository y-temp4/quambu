import React, { Component } from 'react';
import Item from './item';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { Card } from 'react-toolbox/lib/card';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  // ブックマーク数とストック数で表示する記事を絞り込む
  _refineByCount(item, bookmark_count, stock_count) {
    return bookmark_count <= item.bookmark_count && stock_count <= item.stock_users.length
  }

  render() {
    const {items, refineByBookmark, refineByStock, icon, hasSubData, message, title} = this.props;
    if (!hasSubData) {
      return (
        <Card raised>
          <List>
            <ListItem caption={message} />
          </List>
        </Card>
      );
    } else {
      return (
        <Card raised>
          <List>
          <ListSubHeader caption={title} />
            {
              items.length === 0 ?
                <ListItem caption={'記事がありません'} disabled />
                :
                items.slice(0, 20).map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      iconTitle={icon === 'tag' ? item.tags[0].name : item.user.url_name}
                      iconUrl={icon === 'tag' ? item.tags[0].icon_url : item.user.profile_image_url} />
                  );
                })
            }
          </List>
        </ Card>
      );
    }
  }
}

ItemList.defaultProps = {
  hasSubData: false,
  message: '記事がありません'
}
