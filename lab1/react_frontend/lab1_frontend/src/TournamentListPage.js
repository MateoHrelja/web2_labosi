import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const TournamentsListPage = () => {
  const [tournaments, setTournaments] = useState([]);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const hardcodedData = [
    { id: 1, name: "Tournament 1" },
    { id: 2, name: "Tournament 2" },
    { id: 3, name: "Tournament 3" },
  ];

  useEffect(() => {
//     const fetchTournaments = async () => {
//      if (isAuthenticated) {
//        try {
//          const accessToken = await getAccessTokenSilently();
//          const headers = {
//            Authorization: `Bearer ${accessToken}`,
//          };
//          const url = process.env.REACT_APP_API_URL + '/tournaments';
//          const response = await axios.get(url, { headers });
//          setTournaments(response.data);
//        } catch (error) {
//          console.error('Error fetching tournaments:', error);
//        }
//      }
//    };
//
//    fetchTournaments();
    if (isAuthenticated) {
      setTournaments(hardcodedData);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your tournaments.</div>;
  }

  return (
    <div>
      <h1>Your Tournaments</h1>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <Link to={`/tournaments/${tournament.id}`}>{tournament.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentsListPage;