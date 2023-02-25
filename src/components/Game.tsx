import React, { useState } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';

interface Pokemon {
  name: string;
  url: string;
  stats: { base_stat: number }[];
}

interface GameProps {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  onAddToHistory: (pokemon1: Pokemon, pokemon2: Pokemon, userGuess: string, correctAnswer: string) => void;
}

const Game=({ pokemon1, pokemon2, onAddToHistory }: GameProps)=> {
  const [userGuess, setUserGuess] = useState('');
  const [winner, setWinner] = useState<Pokemon | null>(null);

  const handleUserGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  };

  const handlePlayAgain = () => {
    setUserGuess('');
    setWinner(null);
  };

  const handleBattle = () => {
    const pokemon1HP = pokemon1.stats[0].base_stat;
    const pokemon2HP = pokemon2.stats[0].base_stat;

    const correctAnswer = pokemon1HP > pokemon2HP ? pokemon1.name : pokemon2.name;

    setWinner(pokemon1HP > pokemon2HP ? pokemon1 : pokemon2);
    onAddToHistory(pokemon1, pokemon2, userGuess, correctAnswer);
  };

  return (
    <div>
      <h2>Game</h2>
      {pokemon1 && pokemon2 && (
        <div>
          <div>{pokemon1.name} (HP: {pokemon1.stats[0].base_stat})</div>
          <div>{pokemon2.name} (HP: {pokemon2.stats[0].base_stat})</div>
          <div>
            <label>
              <input type="radio" name="guess" value={pokemon1.name} onChange={handleUserGuess} />
              {pokemon1.name}
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="guess" value={pokemon2.name} onChange={handleUserGuess} />
              {pokemon2.name}
            </label>
          </div>
          <button onClick={handleBattle}>Battle</button>
          {winner && (
            <div>
              {winner.name} wins!
              {userGuess.toLowerCase() === winner.name.toLowerCase() ? ' You guessed correctly!' : ' You guessed incorrectly!'}
              <button onClick={handlePlayAgain}>Play again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
