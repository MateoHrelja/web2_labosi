import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton.js'
import LogoutButton from './LogoutButton.js'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [response, setResponse] = useState('');

  const { user, isAuthenticated } = useAuth0();

  console.log(user)

  const sendRequest = async () => {
    const test_body = {
        "name": "Mateo",
        "age": 27
    }
    try {
      const url = process.env.REACT_APP_API_URL + ''
      const response = await axios.post(url, { test_body });
      setResponse(response.data.status);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web2 Lab1 assignment, created in React</h1>
        <h3>A modest homepage for a modest lab assignment</h3>
        {/* <button onClick={sendRequest}>Send Request to Backend Test</button> */}
        {response && <p>Response from Backend: {response}</p>}
        {isAuthenticated && <LogoutButton></LogoutButton>}
        {!isAuthenticated && <LoginButton></LoginButton>}
      </header>
    </div>
  );
}

export default App;
