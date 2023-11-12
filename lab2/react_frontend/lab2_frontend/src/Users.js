import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const [userData, setUserData] = useState(null);

  const queryParams = new URLSearchParams(search);
  const accessProtection = queryParams.get('accessProtection');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/users/${id}?accessProtection=${accessProtection}`;

        const headers = {
          Authorization: 'Bearer aZdhvc65465SFgDFG654bdf;36',
        };

        const response = await axios.get(url, { headers });
        const data = response.data;

        setUserData(data);
      } catch (error) {
        if (error.response) {
          setUserData(error.response.data || 'An error occurred.');
        } else if (error.request) {
          setUserData('No response from the server.');
        } else {
          setUserData('An error occurred while processing the request.');
        }
      }
    };

    fetchData();
  }, [id, accessProtection]);

  return (
    <div style={{ margin: '20px' }}>
      <h1>User Details</h1>
      {userData && typeof userData === 'object' ? (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>Role: {userData.role}</p>
          <p>BIG SECRET: {userData.big_secret}</p>
        </div>
      ) : (
        <p style={{ color: 'red' }}>{userData || 'Loading user data...'}</p>
      )}
    </div>
  );
};

export default Users;
