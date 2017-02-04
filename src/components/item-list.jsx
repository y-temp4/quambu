import React, { Component } from 'react';
import Item from './item';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { Card } from 'react-toolbox/lib/card';
import theme from '../../sass/theme/item-list.scss';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  // ブックマーク数とストック数で表示する記事を絞り込む
  _refineByCount(item, bookmarkCount, stockCount) {
    return bookmarkCount <= item.bookmark_count && stockCount <= item.stock_users.length;
  }

  render() {
    const {items, bookmarkCount, stockCount, icon, hasSubData, message, title} = this.props;
    const filteredItems = items.slice(0, 20).filter((item) => {
      return this._refineByCount(item, bookmarkCount, stockCount);
    });
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
          <ListSubHeader caption={title} theme={theme} />
            {
              filteredItems.length === 0 ?
                <ListItem caption={'記事がありません'} disabled />
                :
                filteredItems
                  .map((item) => {
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
