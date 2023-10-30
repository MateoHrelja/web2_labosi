import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TournamentDetailPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState({
    name: "Tournament 1",
    sport: "Šah (3/1/0)",
    competitors: "A;B;C;D",
    schedule: "A;B|A;C|A;D|B;C|B;D|C;D",
    is_editable: id === '2',
    results: "A|C|D|-|-|-",
  });
  const [results, setResults] = useState(tournament.results);

  const handleResultsChange = (event) => {
    setResults(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updated results:", results);
  };

  return (
    <div>
      <h1>Tournament Details</h1>
      <p>Name: {tournament.name}</p>
      <p>Sport: {tournament.sport}</p>
      <p>Competitors: {tournament.competitors}</p>
      <p>Schedule: {tournament.schedule}</p>
      <div>
        {tournament.is_editable ? (
          <form onSubmit={handleSubmit}>
            <label>
              Results:
              <input
                type="text"
                value={results}
                onChange={handleResultsChange}
              />
            </label>
            <button type="submit">Update Results</button>
          </form>
        ) : (
          <p>Results: {tournament.results}</p>
        )}
      </div>
    </div>
  );
};

export default TournamentDetailPage;