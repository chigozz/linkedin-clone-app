import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link } from "react-router-dom";
import logo from "../assets/linkedin-logo.png";
import "../App.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      alert(getErrorPrompt(error.code));
    }
  };

  // Function to get the prompt message based on error code
  const getErrorPrompt = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email already in use. Please choose a different email address.";
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      // Add more cases for other error codes if needed
      default:
        return "An error occurred during sign-up. Please try again later.";
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <h1 className="text-center">
          <img src={logo}className ="logo"/>Sign Up
        </h1>
        <br />

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <br />
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>

        <br />
        <br />
        <p className="text-center">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
