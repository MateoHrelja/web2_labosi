import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState('');

  const sendRequest = async () => {
    const test_body = {
        "name": "Mateo",
        "age": 27
    }
    try {
      const response = await axios.post('http://localhost:3001', { test_body }); // Replace with your actual backend endpoint
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
      </header>
    </div>
  );
}

export default App;
