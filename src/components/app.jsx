import React, { Component } from 'react';
import Item from './item';
import ItemList from './item-list';
import Header from './header';
import 'whatwg-fetch';
import { fetchUserSubData } from '../api/fetch-user-sub-data';
import { setBookmarkCountToItems } from '../api/set-bookmark-count-to-items';
import { createQuery } from '../utils/create-query';

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
      refine_by_bookmark: 0,
      refine_by_stock: 0,
      refined_items: null
    };
  }

  componentWillMount() {
    console.log('will')
  }

  componentDidMount() {
    console.log('did')

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
    const tagQuery = createQuery(this.state.following_tags, 'tag');
    fetch('../../mock/following_tags_related_items.json')
    // fetch(SEARCH_ITEMS_URI + tagQuery)
      .then((response) => response.json() )
      .then((json) => {
        const items = setBookmarkCountToItems(json)
        this.setState({following_tags_related_items: items});
      }).catch((ex) => { console.log('parsing failed', ex); });

    // ユーザーがフォローしているユーザーに紐づく記事をstateに保存
    const userQuery = createQuery(this.state.following_users, 'user');
    fetch('../../mock/following_users_related_items.json')
    // fetch(SEARCH_ITEMS_URI + userQuery)
      .then((response) => response.json() )
      .then((json) => {
        const items = setBookmarkCountToItems(json)
        this.setState({following_users_related_items: items});
      }).catch((ex) => { console.log('parsing failed', ex); });
  }

  _handleBookmarkCountChange(e) {
    this.setState({refine_by_bookmark: e.target.value});
    const items = this.state.items.filter((item) => {
      return item.bookmark_count >= e.target.value;
    })
    this.setState({refined_items: items});
  }

  _handleStockCountChange(e) {
    this.setState({refine_by_stock: e.target.value});
  }

  render() {
    return (
      <div>
        <Header/>
        <div  style={{marginTop: '8rem'}}></div>
        <input type="number" onChange={this._handleBookmarkCountChange.bind(this)} />
        <input type="number" onChange={this._handleStockCountChange.bind(this)} />
        <input type="text" ref="userName"/>
        <button onClick={this._handleChange.bind(this)}>ok</button>
        <ItemList
          title={'User following tags items'}
          items={this.state.following_tags_related_items}
          icon={'tag'}
          refineByBookmark={this.state.refine_by_bookmark}
          refineByStock={this.state.refine_by_stock}
          hasSubData={this.state.following_tags.length}
          message={'タグが登録されていません'} />
        <ItemList
          title={'User following users items'}
          items={this.state.following_users_related_items}
          icon={'user'}
          refineByBookmark={this.state.refine_by_bookmark}
          refineByStock={this.state.refine_by_stock}
          hasSubData={this.state.following_users.length}
          message={'ユーザーが登録されていません'} />
        <ItemList
          title={'New Items'}
          items={this.state.refined_items === null ? this.state.items : this.state.refined_items}
          icon={'tag'}
          refineByBookmark={this.state.refine_by_bookmark}
          refineByStock={this.state.refine_by_stock}
          hasSubData={true} />
      </div>
    );
  }
}
