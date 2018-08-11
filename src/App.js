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
      var author = '/u/' + this.state.posts[index].data.author;
      var post = this.state.posts[index].data.title;
      var link = this.state.posts[index].data.permalink;
      posts.push(
          <div id={'#' + index} key={'#' + index} className="post">
              <p id={index} className="number">
                {'#' + index}
              </p>
            <a href={'https://reddit.com' + link} target="_blank" className="comments">
              comments
            </a>
            <p className="author">{author}</p>
            <hr />
            <p className="p-post">{post}</p>
          </div>
      );
    }
    return <div className="feed">{posts}</div>;
  }
}

export default App;
