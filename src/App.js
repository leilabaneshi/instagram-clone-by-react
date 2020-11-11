import React, { useState } from 'react';
import Post from './Post';
import './App.css';

function App() {

  const [posts, setPosts] = useState([
    {
      username: 'leilabaneshi',
      caption: 'sunny day',
      imageurl: 'https://yt3.ggpht.com/a/AATXAJx3PndkWds1bfXd9OCocVVrnPoMOE3cHHjQrx3B=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      username: 'leilabaneshi',
      caption: 'sunny day',
      imageurl: 'https://yt3.ggpht.com/a/AATXAJx3PndkWds1bfXd9OCocVVrnPoMOE3cHHjQrx3B=s176-c-k-c0x00ffffff-no-rj'
    }
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='instagram-logo'
        />

      </div>
      <h1>instagram</h1>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
