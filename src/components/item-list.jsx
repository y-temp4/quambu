import React, { Component } from 'react';
import Item from './item';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {items, refineByBookmark, icon} = this.props;
    return (
      <ol>
        {
          items.map((item) => {
            if (refineByBookmark <= item.bookmark_count) {
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
