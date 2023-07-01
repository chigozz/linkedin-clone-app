import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import CreatePost from "./CreatePost.jsx";
import ShowPost from "./ShowPost.jsx";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
    <NavBar/>
    <br/>
    <CreatePost/>

    <br/>

    <ShowPost/>

    </div>
  );
}

export default HomePage;
