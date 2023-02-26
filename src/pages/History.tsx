import React, { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  url: string;
  stats: { base_stat: number }[];
}

interface HistoryItem {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  userGuess: string;
  correctAnswer: string;
}

function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(savedHistory);
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.setItem('history', '[]');
  };

  return (
    <div>
      <h2>History</h2>
      {history.length > 0 ? (
        <table>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.pokemon1.name}</td>
                <td>{item.pokemon2.name}</td>
                <td>{item.userGuess}</td>
                <td>{item.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history yet</p>
      )}
      <button onClick={handleClearHistory}>Clear history</button>
    </div>
  );
}
export default History;