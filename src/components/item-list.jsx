import React, { Component } from 'react';
import Item from './item';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {items, refineByBookmark, icon, hasSubData, message} = this.props;
    if (!hasSubData) {
      return <span>{message}</span>;
    } else {
      return (
        <ol>
          {
            items.map((item) => {
              if (item.bookmark_count === undefined ||
                refineByBookmark <= item.bookmark_count) {
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
        </ol>
      );
    }
  }
}

ItemList.defaultProps = {
  hasSubData: false,
  message: '記事がありません'
}
