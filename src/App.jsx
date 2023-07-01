import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import JobList from "./components/JobList.jsx";
import ChatPanel from "./components/ChatPanel.jsx";

// Replace the following configuration with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1vi5_ayIE26WD5dwQaPa1_MEhx7CIHzU",
  authDomain: "linkedin-clone-8243f.firebaseapp.com",
  databaseURL: "https://linkedin-clone-8243f-default-rtdb.firebaseio.com",
  projectId: "linkedin-clone-8243f",
  storageBucket: "linkedin-clone-8243f.appspot.com",
  messagingSenderId: "1073036094350",
  appId: "1:1073036094350:web:a302064a5bf47fdd9552df",
  measurementId: "G-Z13YRGWS3V",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for user authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />

        <Route
          path="/jobs"
          element={<JobList />}

          />

          <Route
          path="/message"
          element={<ChatPanel />}

          />

      </Routes>
    </Router>
  );
}

export default App;
