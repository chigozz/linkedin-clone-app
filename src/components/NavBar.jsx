import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import logo from "../assets/linkedin-logo.png";
import '../App.css';

function NavBar() {
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const getCurrentUserInitial = () => {
    const user = firebase.auth().currentUser;
    if (user && user.email) {
      const email = user.email;
      return email[0].toUpperCase();
    }
    return '';
  };

  const getRandomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getInitialsStyle = {
    backgroundColor: getRandomColor(),
    color: '#fff',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="LinkedIn Logo" className="logo-l" />
        </Link>
        <form className="form-inline my-2 my-md-0">
          <input
            className="form-control mr-sm-2 custom-search-bar"
            type="text"
            placeholder="Search for jobs, people..."
          />
        </form>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/network" className="nav-link">
                My Network
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/message" className="nav-link">
                Messaging
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <div className="profile-picture" style={getInitialsStyle}>
                {getCurrentUserInitial()}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
