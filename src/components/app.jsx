import React, { Component } from 'react';
import Item from './item';
import ItemList from './item-list';
import 'whatwg-fetch';
import { fetchUserSubData } from '../api/fetch-user-sub-data';
import { setBookmarkCountToItems } from '../api/set-bookmark-count-to-items';

const QIITA_API_ENDPOINT = 'https://qiita.com/api/v1';
const NEW_ITEMS_URI = QIITA_API_ENDPOINT + '/items';
const USER_DATA_URI = QIITA_API_ENDPOINT + '/users';
const SEARCH_ITEMS_URI = QIITA_API_ENDPOINT + '/search';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      items: [],
      following_tags: [],
      following_users: [],
      following_tags_related_items: [],
      following_users_related_items: [],
      refine_by_bookmark: 0
    };
  }

  componentDidMount() {
    fetch('../../mock/items.json')
    // fetch(NEW_ITEMS_URI)
      .then((response) => response.json() )
      .then((json) => {
        const items = setBookmarkCountToItems(json)
        this.setState({items: items});
      })
      .catch((ex) => { console.log('parsing failed', ex); });
  }

  _handleChange(e) {
    const GOT_USER_DATA_URI = `${USER_DATA_URI}/${this.refs.userName.value}`;
    this.setState({username: this.refs.userName.value});

    // ユーザーがフォローしているタグをstateに保存
    fetchUserSubData('../../mock/following_tags.json')
    // fetchUserSubData(GOT_USER_DATA_URI + '/following_tags')
    .then((tags) => { this.setState({following_tags: tags}) });

    // ユーザーがフォローしているユーザーをstateに保存
    fetchUserSubData('../../mock/following_users.json')
    // fetchUserSubData(GOT_USER_DATA_URI + '/following_users')
    .then((users) => { this.setState({following_users: users}) });

    // ユーザーがフォローしているタグに紐づく記事をstateに保存
    let tagQuery = '?q=';
    this.state.following_tags.map((tag) => {
      tagQuery += `tag%3A${tag}+OR+`;
    });
    fetch('../../mock/following_tags_related_items.json')
    // fetch(SEARCH_ITEMS_URI + tagQuery)
      .then((response) => response.json() )
      .then((json) => {
        const items = setBookmarkCountToItems(json)
        this.setState({following_tags_related_items: items});
      }).catch((ex) => { console.log('parsing failed', ex); });

    // ユーザーがフォローしているユーザーに紐づく記事をstateに保存
    let userQuery = '?q=';
    this.state.following_users.map((tag) => {
      userQuery += `user%3A${tag}+OR+`;
    });
    fetch('../../mock/following_users_related_items.json')
    // fetch(SEARCH_ITEMS_URI + userQuery)
      .then((response) => response.json() )
      .then((json) => {
        const items = setBookmarkCountToItems(json)
        this.setState({following_users_related_items: items});
      }).catch((ex) => { console.log('parsing failed', ex); });
  }

  _handleItemChange(e) {
    this.setState({refine_by_bookmark: e.target.value});
  }

  _showTagRelatedItems() {
    if (!this.state.following_tags.length) {
      return <span>タグないです</span>;
    } else {
      return (
        <ItemList
          items={this.state.following_tags_related_items}
          icon={'tag'}
          refineByBookmark={this.state.refine_by_bookmark} />
      );
    }
  }

  _showUserRelatedItems() {
    if (!this.state.following_users.length) {
      return <span>ユーザーないです</span>;
    } else {
      return (
        <ItemList
          items={this.state.following_users_related_items}
          icon={'user'}
          refineByBookmark={this.state.refine_by_bookmark} />
      );
    }
  }

  render() {
    return (
      <div>
        <input type="number" onChange={this._handleItemChange.bind(this)} />
        <input type="text" ref="userName"/>
        <button onClick={this._handleChange.bind(this)}>ok</button>
        <h1>User following tags items</h1>
          {this._showTagRelatedItems()}
        <h1>User following users items</h1>
          {this._showUserRelatedItems()}
        <h1>New Articles</h1>
        <ItemList
          items={this.state.items}
          icon={'tag'}
          refineByBookmark={this.state.refine_by_bookmark} />
      </div>
    );
  }
}
