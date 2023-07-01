import React, { useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

function CreatePost() {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null); // Add postImage state
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setPostImage(image);
  };

  const handlePost = () => {
    if (postText || postImage) {
      const currentUser = firebase.auth().currentUser;
      const post = {
        text: postText,
        image: postImage ? postImage.name : null,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        userEmail: currentUser ? currentUser.email : null,
      };
  
      // Get a reference to the 'posts' collection in Firebase database
      const postsRef = firebase.database().ref('posts');
  
      // Create a new post ID
      const newPostRef = postsRef.push();
  
      // Set the post data under the new post ID
      newPostRef.set(post);
  
      // Clear the form fields
      setPostText('');
      setPostImage(null);
    }
  };
  
  

  return (
    <div className="create-post">
      <div className="d-flex align-items-center">

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleImageChange}

          onClick={handlePhotoClick}
          style={{ marginLeft: '125px' }}
        />
        <textarea
          className="form-control form-control-sm mr-2"
          rows="2"
          placeholder="Start a post..."
          style={{ width: 'calc(100% - 500px)' }}
          value={postText}
          onChange={handleTextChange}

        ></textarea>
        <button className="btn btn-primary" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
