import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { Card } from 'react-bootstrap';

function ShowPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from Firebase database
    const fetchPosts = async () => {
      const postsRef = firebase.database().ref('posts');
      const snapshot = await postsRef.once('value');
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.entries(postsData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setPosts(postsArray);
      }
    };

    fetchPosts();
  }, []);

  const getRandomColor = () => {
    const colors = [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#607D8B',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="show-post">
      {posts.map((post) => (
        <Card key={post.id} className="mb-4" style={{ marginLeft: '125px', marginRight: '140px' }}>
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              {post.userEmail && (
                <div
                  className="profile-picture"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: getRandomColor(),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {post.userEmail[0]}
                </div>
              )}
              <div style={{ marginLeft: '10px' }}>
                {post.userEmail && <div>{post.userEmail}</div>}
              </div>
            </div>
            {post.text && <Card.Text>{post.text}</Card.Text>}
            {post.imageUrl && (
              <Card.Img
                src={post.imageUrl}
                alt="Post Image"
                className="mb-3"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ShowPost;
