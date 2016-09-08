import React, { Component } from 'react';
import 'whatwg-fetch';

const ENDPOINT = 'https://qiita.com/api/v1';
const NEW_ITEMS_URI = ENDPOINT + '/items';
const USER_DATA_URI = ENDPOINT + '/users';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      items: [],
      following_tags: [],
      following_users: []
    }
  }

  componentDidMount() {
    fetch('../../mock/items.json')
    // fetch(NEW_ITEMS_URI)
      .then((response) => response.json() )
      .then((json) => { this.setState({items: json})
        console.log('parsed json', this.state.items)
      }).catch((ex) => { console.log('parsing failed', ex) })
  }

  _handleChange(e) {
    const GOT_USER_DATA_URI = USER_DATA_URI + '/' + this.refs.userName.value
    this.setState({username: this.refs.userName.value})

    // ユーザーがフォローしているタグをstateに保存
    fetch('../../mock/following_tags.json')
    // fetch(GOT_USER_DATA_URI + '/following_tags')
      .then((response) => response.json() )
      .then((json) => {
        const tags = []
        json.map((tag) => { tags.push(tag.url_name) })
        this.setState({following_tags: tags})
      }).catch((ex) => { console.log('parsing failed', ex) })

    // ユーザーがフォローしているユーザーをstateに保存
    fetch('../../mock/following_users.json')
    // fetch(GOT_USER_DATA_URI + '/following_users')
      .then((response) => response.json() )
      .then((json) => {
        const users = []
        json.map((user) => { users.push(user.url_name) })
        this.setState({following_users: users})
      }).catch((ex) => { console.log('parsing failed', ex) })
  }

  render() {
    return (
      <div>
        <h1>New Articles</h1>
        <input type="text" ref="userName"/>
        <button onClick={this._handleChange.bind(this)}>ok</button>
        <ol>
          {
            this.state.items.map((item) => {
              return (
                <li key={item.id}>
                  <a href={item.url} target="_blank">{item.title}</a>
                </li>
              )
            })
          }
        </ol>
      </div>
    );
  }
}
