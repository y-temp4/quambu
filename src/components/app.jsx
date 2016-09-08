import React, { Component } from 'react';
import 'whatwg-fetch';

const ENDPOINT = 'https://qiita.com/api/v1';
const NEW_ARTICLES_URI = ENDPOINT + '/items';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      items: []
    }
  }

  componentDidMount() {
    fetch('../../mock/items.json')
    // fetch(NEW_ARTICLES_URI)
      .then((response) => response.json() )
      .then((json) => { this.setState({items: json})
        console.log('parsed json', this.state.items)
      }).catch((ex) => { console.log('parsing failed', ex) })
  }

  _handleChange(e) {
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <div>
        <h1>New Articles</h1>
        <input type="text" onChange={this._handleChange.bind(this)}/>
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
