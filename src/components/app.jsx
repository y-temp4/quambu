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
const NEW_ITEMS_URI = QIITA_API_ENDPOINT + '/items?per_page=100';
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
      bookmark_count: 0,
      stock_count: 0,
      refined_items: null,
      refined_following_tags_related_items: null,
      refined_following_users_related_items: null,
      active: false
    };

    this.fetchItemsByUserData = this.fetchItemsByUserData.bind(this);
    this.filterItemByCountChange = this.filterItemByCountChange.bind(this);
    this.toggleDrower = this.toggleDrower.bind(this);
  }

  componentDidMount() {
    // fetchItems('../../mock/items.json').then((items) => {
    fetchItems(NEW_ITEMS_URI).then((items) => {
      this.setState({items: items});
    });
  }

  fetchItemsByUserData(userName) {
    const GOT_USER_DATA_URI = `${USER_DATA_URI}/${userName}`;
    this.setState({username: userName});

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

  filterItemByCountChange(service, value) {
    if (service === 'bookmark') {
      this.setState({bookmark_count: value});
    } else {
      this.setState({stock_count: value});
    }
    const items = this.state.items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= value && item.stock_count >= this.state.stock_count;
      }{
        return item.bookmark_count >= this.state.bookmark_count && item.stock_count >= value;
      }
    });
    const following_tags_related_items = this.state.following_tags_related_items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= value && item.stock_count >= this.state.stock_count;
      }{
        return item.bookmark_count >= this.state.bookmark_count && item.stock_count >= value;
      }
    });
    const following_users_related_items = this.state.following_users_related_items.filter((item) => {
      if (service === 'bookmark') {
        return item.bookmark_count >= value && item.stock_count >= this.state.stock_count;
      }{
        return item.bookmark_count >= this.state.bookmark_count && item.stock_count >= value;
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
        <SideMenu
          active={this.state.active}
          fetchItemsByUserData={this.fetchItemsByUserData}
          filterItemByCountChange={this.filterItemByCountChange}
          toggleDrower={this.toggleDrower}
          userName={this.state.username}
          bookmarkCount={this.state.bookmark_count}
          stockCount={this.state.stock_count} />
        <div  style={{marginTop: '8rem'}}></div>
        <Grid style={{maxWidth: 1000, width: '90%'}}>
          <Row>
            <Col xs={12} lg={6} style={{padding: 15}}>
              <ItemList
                title={"User following tag's items"}
                items={this.state.refined_following_tags_related_items === null ? this.state.following_tags_related_items : this.state.refined_following_tags_related_items}
                icon={'tag'}
                refineByBookmark={this.state.bookmark_count}
                refineByStock={this.state.stock_count}
                hasSubData={this.state.following_tags.length}
                message={'タグが登録されていません'} />
            </Col>
            <Col xs={12} lg={6} style={{padding: 15}}>
              <ItemList
                title={"User following user's items"}
                items={this.state.refined_following_users_related_items === null ? this.state.following_users_related_items : this.state.refined_following_users_related_items}
                icon={'user'}
                refineByBookmark={this.state.bookmark_count}
                refineByStock={this.state.stock_count}
                hasSubData={this.state.following_users.length}
                message={'ユーザーが登録されていません'} />
            </Col>
            <Col xs={12} style={{padding: 15}}>
              <ItemList
                title={'New Items'}
                items={this.state.refined_items === null ? this.state.items : this.state.refined_items}
                icon={'tag'}
                refineByBookmark={this.state.bookmark_count}
                refineByStock={this.state.stock_count}
                hasSubData={true} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
