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
    // console.log(items[0].bookmark_count)
    if (!hasSubData) {
      return (
        <Card style={{width: '90%', margin: '2%'}} raised>
          <List>
            <ListItem caption={message} />
          </List>
        </Card>
      );
    } else {
      return (
        <Card style={{width: '90%', margin: '2%'}} raised>
          <List>
          <ListSubHeader caption={title} />
            {
              items.map((item) => {
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
