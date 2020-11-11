import React, { useState, useEffect } from 'react';
import Post from './Post';
import './App.css';
import { db } from './Firebase'

function App() {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

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
        posts.map(({ id, post }) => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
