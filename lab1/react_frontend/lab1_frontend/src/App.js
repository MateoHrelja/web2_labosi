import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton.js'

function App() {
  const [response, setResponse] = useState('');

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
        <h1>Baseline React App</h1>
        <button onClick={sendRequest}>Send Request to Backend Test</button>
        {response && <p>Response from Backend: {response}</p>}
        <LoginButton></LoginButton>
      </header>
    </div>
  );
}

export default App;
