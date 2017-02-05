import React from 'react';
import { describe } from 'ava-spec';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { ListItem } from 'react-toolbox/lib/list';
import Item from '../../src/components/item';
import theme from '../../sass/theme/item.scss';

const wrapper = shallow(
  <Item
    item={{
      stock_users: ['a', 'b', 'c'],
      bookmark_count: 1,
      url: 'http://item-url.com',
      title: 'item-title',
      user: { url_name: 'url-name' },
    }}
    iconUrl={'http://icon-url.com'}
  />
);

describe('<Item />', it => {

  it('expect target of Item is _blank', t => {
    t.truthy(wrapper);
    t.is(wrapper.node.type, 'a');
    t.is(wrapper.node.props.target, '_blank');
  });

  it('expect correct node', t => {
    t.is(wrapper.equals(
      <a href={'http://item-url.com'} target="_blank" rel="noopener noreferrer">
        <ListItem
          theme={theme}
          avatar={'http://icon-url.com'}
          caption={'item-title'}
          legend={'by url-name | ストック：3, ブックマーク：1'}
          selectable
          ripple
        />
      </a>
    ), true);
  });
});
