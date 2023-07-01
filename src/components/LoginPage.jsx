import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import logo from "../assets/linkedin-logo.png";
import "../App.css";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorPrompt(error.code));
    }

    setLoading(false);
  };

  // Function to get the prompt message based on error code
  const getErrorPrompt = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return "User not found. Please check your email and password.";
      case 'auth/wrong-password':
        return "Invalid password. Please try again.";
      // Add more cases for other error codes if needed
      default:
        return "An error occurred during sign-in. Please try again later.";
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 text-center login-container">
        <h1><img src = {logo} className='logo'/> Login</h1>
        <br/>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control narrow-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <br/>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control narrow-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <br/>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-3">
          Not registered? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
