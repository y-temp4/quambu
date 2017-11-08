/* eslint class-methods-use-this: ["error", { "exceptMethods": ["refineByCount"] }] */

import React, { Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { Card } from 'react-toolbox/lib/card';
import Item from './item';
import theme from '../../sass/theme/item-list.scss';

export default class ItemList extends Component {

  // ブックマーク数とストック数で表示する記事を絞り込む
  refineByCount(item, bookmarkCount, stockCount) {
    return bookmarkCount <= item.bookmark_count && stockCount <= item.likes_count;
  }

  render() {
    const { items, bookmarkCount, stockCount, icon, hasSubData, message, title } = this.props;
    const filteredItems =
      items.slice(0, 20).filter(item => this.refineByCount(item, bookmarkCount, stockCount));
    if (!hasSubData) {
      return (
        <Card raised>
          <List>
            <ListItem caption={message} />
          </List>
        </Card>
      );
    }
    return (
      <Card raised>
        <List>
          <ListSubHeader caption={title} theme={theme} />
          {
            filteredItems.length === 0 ?
              <ListItem caption={'記事がありません'} disabled />
              :
              filteredItems
                .map(item =>
                  <Item
                    key={item.id}
                    item={item}
                    iconUrl={item.user.profile_image_url}
                  />,
              )
            }
        </List>
      </Card>
    );
  }
}

ItemList.defaultProps = {
  hasSubData: false,
  message: '記事がありません',
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  bookmarkCount: PropTypes.number.isRequired,
  stockCount: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  hasSubData: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
