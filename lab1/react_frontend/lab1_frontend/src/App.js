import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton.js'
import LogoutButton from './LogoutButton.js'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [response, setResponse] = useState('');

  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web2 Lab1 assignment, created in React</h1>
        <h3>Just a simple landing page with login/logout buttons</h3>
        {response && <p>Response from Backend: {response}</p>}
        {isAuthenticated && <p>Welcome, {user.nickname}</p>}
        {isAuthenticated && <LogoutButton></LogoutButton>}
        {!isAuthenticated && <LoginButton></LoginButton>}
      </header>
    </div>
  );
}

export default App;
