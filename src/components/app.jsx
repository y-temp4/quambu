import React, { Component } from 'react';
import 'whatwg-fetch';

const ENDPOINT = 'https://qiita.com/api/v1';
const NEW_ITEMS_URI = ENDPOINT + '/items';
const USER_DATA_URI = ENDPOINT + '/users';
const SEARCH_ITEMS_URI = ENDPOINT + '/search';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      items: [],
      following_tags: [],
      following_users: [],
      following_tags_related_items: [],
      following_users_related_items: []
    };
  }

  componentDidMount() {
    fetch('../../mock/items.json')
    // fetch(NEW_ITEMS_URI)
      .then((response) => response.json() )
      .then((json) => { this.setState({items: json}); })
      .catch((ex) => { console.log('parsing failed', ex); });
  }

  _handleChange(e) {
    const GOT_USER_DATA_URI = `${USER_DATA_URI}/${this.refs.userName.value}`;
    this.setState({username: this.refs.userName.value});

    // ユーザーがフォローしているタグをstateに保存
    fetch('../../mock/following_tags.json')
    // fetch(GOT_USER_DATA_URI + '/following_tags')
      .then((response) => response.json() )
      .then((json) => {
        const tags = [];
        json.map((tag) => { tags.push(tag.url_name); });
        this.setState({following_tags: tags});
      }).catch((ex) => { console.log('parsing failed', ex) });

    // ユーザーがフォローしているユーザーをstateに保存
    fetch('../../mock/following_users.json')
    // fetch(GOT_USER_DATA_URI + '/following_users')
      .then((response) => response.json() )
      .then((json) => {
        const users = [];
        json.map((user) => { users.push(user.url_name) });
        this.setState({following_users: users});
      }).catch((ex) => { console.log('parsing failed', ex); })

    // ユーザーがフォローしているタグに紐づく記事をstateに保存
    let tagQuery = '?q=';
    this.state.following_tags.map((tag) => {
      tagQuery += `tag%3A${tag}+OR+`;
    });
    fetch('../../mock/following_tags_related_items.json')
    // fetch(SEARCH_ITEMS_URI + tagQuery)
      .then((response) => response.json() )
      .then((json) => {
        this.setState({following_tags_related_items: json});
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
        this.setState({following_users_related_items: json});
      }).catch((ex) => { console.log('parsing failed', ex); });
  }

  _showTagRelatedItems() {
    if (!this.state.following_tags.length) {
      return <span>タグないです</span>;
    } else {
      return (
        <ol>
          {
            this.state.following_tags_related_items.map((item) => {
              console.log(item.tags[0].url_name)
             return (
               <li key={item.id}>
                 <a href={item.url} target="_blank">
                  <img src={item.tags[0].icon_url} alt=""/>
                  {item.title}
                 </a>
               </li>
             )
           })
         }
        </ol>
      );
    }
  }

  _showUserRelatedItems() {
    if (!this.state.following_users.length) {
      return <span>ユーザーないです</span>;
    } else {
      return (
        <ol>
          {
            this.state.following_users_related_items.map((item) => {
             return (
               <li key={item.id}>
                 <a href={item.url} target="_blank">
                  <img src={item.user.profile_image_url} alt="" width="30"/>
                  {item.title}
                 </a>
               </li>
             )
           })
         }
        </ol>
      );
    }
  }

  render() {
    return (
      <div>
        <input type="text" ref="userName"/>
        <button onClick={this._handleChange.bind(this)}>ok</button>
        <h1>User following tags items</h1>
          {this._showTagRelatedItems()}
        <h1>User following users items</h1>
          {this._showUserRelatedItems()}
        <h1>New Articles</h1>
        <ol>
          {
            this.state.items.map((item) => {
              return (
                <li key={item.id}>
                  <a href={item.url} target="_blank">{item.title}</a>
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }
}
