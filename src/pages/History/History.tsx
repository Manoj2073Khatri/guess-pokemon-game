import React, { useEffect, useState } from 'react';
import './History.scss'
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
    <div className='history'>
      <h2 className='heading'>History</h2>
      {history.length > 0 ? (
        <table className='pokemon'>
          <tbody>
            <tr>
              <th>Pokemon1</th>
              <th>Pokemon2</th>
              <th>User Guess</th>
              <th>Correct Answer</th>
            </tr>
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
        <p className='message'>No history yet</p>
      )}
      <button onClick={handleClearHistory}>Clear history</button>
    </div>
  );
}
export default History;