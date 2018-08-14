import React, { Component } from 'react';
import './App.css';

const URL = "https://www.reddit.com/r/Showerthoughts.json?limit=100"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount () {
    fetch(URL).then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts.data.children });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let posts = [];
    for (var index = 1; index < this.state.posts.length; index++) {
      var data = {
        author:'/u/' + this.state.posts[index].data.author,
        post: this.state.posts[index].data.title,
        link: this.state.posts[index].data.permalink
      }
      posts.push(
        <div id={'#' + index} className="post">
          <p className="post-number">
            {'#' + index}
          </p>
          <a href={'https://reddit.com' + data.link} target="_blank" className="post-comments">
            comments
          </a>
          <p className="post-author">{data.author}</p>
          <p className="post-content">{data.post}</p>
        </div>
      );
    }
    return (
      <div>
        <h1 id="header">
          <a href="https://reddit.com/r/Showerthoughts" target="_blank" rel="noopener noreferrer">
            Showerthoughts
          </a>
        </h1>
        <div className="feed">
          {posts}
        </div>
      </div>
    );
  }
}

export default App;
