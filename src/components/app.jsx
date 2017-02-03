import React, { Component } from 'react';
import Item from './item';
import ItemList from './item-list';
import Header from './header';
import SideMenu from './side-menu';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import 'whatwg-fetch';
import { fetchUserSubData } from '../api/fetch-user-sub-data';
import { fetchItems } from '../api/fetch-items';
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
      refined_items: null,
      refined_following_tags_related_items: null,
      refined_following_users_related_items: null,
      active: false
    };

    this.toggleDrower = this.toggleDrower.bind(this);
  }

  componentDidMount() {
    fetchItems('../../mock/items.json').then((items) => {
    // fetchItems(NEW_ITEMS_URI).then((items) => {
      this.setState({items: items});
    });
  }

  _handleChange(e) {
    const GOT_USER_DATA_URI = `${USER_DATA_URI}/${this.refs.userName.value}`;
    this.setState({username: this.refs.userName.value});

    // ユーザーがフォローしているタグをstateに保存
    // fetchUserSubData('../../mock/following_tags.json')
    fetchUserSubData(GOT_USER_DATA_URI + '/following_tags')
      .then((tags) => {
        this.setState({following_tags: tags});
        // ユーザーがフォローしているタグに紐づく記事をstateに保存
        const tagQuery = createQuery(this.state.following_tags, 'tag');

        // fetchItems('../../mock/following_tags_related_items.json').then((items) => {
        fetchItems(SEARCH_ITEMS_URI + tagQuery).then((items) => {
          this.setState({following_tags_related_items: items});
        });
      });

    // ユーザーがフォローしているユーザーをstateに保存
    // fetchUserSubData('../../mock/following_users.json')
    fetchUserSubData(GOT_USER_DATA_URI + '/following_users')
      .then((users) => {
        this.setState({following_users: users});
        // ユーザーがフォローしているユーザーに紐づく記事をstateに保存
        const userQuery = createQuery(this.state.following_users, 'user');

        // fetchItems('../../mock/following_users_related_items.json').then((items) => {
        fetchItems(SEARCH_ITEMS_URI + userQuery).then((items) => {
          this.setState({following_users_related_items: items});
        });
      });
  }

  _handleCountChange(service, e) {
    if (service === 'bookmark') {
      this.setState({refine_by_bookmark: e.target.value});
    } else {
      this.setState({refine_by_stock: e.target.value});
    }
    const items = this.state.items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= e.target.value && item.stock_count >= this.state.refine_by_stock;
      }{
        return item.bookmark_count >= this.state.refine_by_bookmark && item.stock_count >= e.target.value;
      }
    });
    const following_tags_related_items = this.state.following_tags_related_items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= e.target.value && item.stock_count >= this.state.refine_by_stock;
      }{
        return item.bookmark_count >= this.state.refine_by_bookmark && item.stock_count >= e.target.value;
      }
    });
    const following_users_related_items = this.state.following_users_related_items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= e.target.value && item.stock_count >= this.state.refine_by_stock;
      }{
        return item.bookmark_count >= this.state.refine_by_bookmark && item.stock_count >= e.target.value;
      }
    });
    this.setState({refined_items: items,
      refined_following_tags_related_items: following_tags_related_items,
      refined_following_users_related_items: following_users_related_items
    });
  }

  toggleDrower() {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <div>
        <Header toggleDrower={this.toggleDrower}/>
        <SideMenu active={this.state.active} toggleDrower={this.toggleDrower}/>
        <div  style={{marginTop: '8rem'}}></div>
        <input type="number" onChange={this._handleCountChange.bind(this, 'bookmark')} />
        <input type="number" onChange={this._handleCountChange.bind(this, 'stock')} />
        <input type="text" ref="userName"/>
        <button onClick={this._handleChange.bind(this)}>ok</button>
        <Grid style={{maxWidth: 1000, width: '90%'}}>
          <Row>
            <Col xs={12} lg={6} style={{padding: 15}}>
              <ItemList
                title={'User following tags items'}
                items={this.state.refined_following_tags_related_items === null ? this.state.following_tags_related_items : this.state.refined_following_tags_related_items}
                icon={'tag'}
                refineByBookmark={this.state.refine_by_bookmark}
                refineByStock={this.state.refine_by_stock}
                hasSubData={this.state.following_tags.length}
                message={'タグが登録されていません'} />
            </Col>
            <Col xs={12} lg={6} style={{padding: 15}}>
              <ItemList
                title={'User following users items'}
                items={this.state.refined_following_users_related_items === null ? this.state.following_users_related_items : this.state.refined_following_users_related_items}
                icon={'user'}
                refineByBookmark={this.state.refine_by_bookmark}
                refineByStock={this.state.refine_by_stock}
                hasSubData={this.state.following_users.length}
                message={'ユーザーが登録されていません'} />
            </Col>
            <Col xs={12} style={{padding: 15}}>
              <ItemList
                title={'New Items'}
                items={this.state.refined_items === null ? this.state.items : this.state.refined_items}
                icon={'tag'}
                refineByBookmark={this.state.refine_by_bookmark}
                refineByStock={this.state.refine_by_stock}
                hasSubData={true} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
