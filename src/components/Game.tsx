import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useQueries, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

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

const Game=({ pokemon1, pokemon2,onAddToHistory }: GameProps)=> {
  const [userGuess, setUserGuess] = useState('');
  const [winner, setWinner] = useState<Pokemon | null>(null);
 
   const [show, setShow] = useState<boolean>(false);
   const currentPathRef = useRef<string>(window.location.pathname);

   const navigate=useNavigate();
  


  const queryResults = useQueries([
    {
      queryKey: ["pokemon1", pokemon1.url],
      queryFn: () => axios.get(pokemon1.url).then((res) => res.data),
    },
    {
      queryKey: ["pokemon2", pokemon2.url],
      queryFn: () => axios.get(pokemon2.url).then((res) => res.data),
    },
  ]);
 
  if (queryResults.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }

  const pokemon1stat = queryResults[0].data;
  const pokemon2stat = queryResults[1].data;


  const handleUserGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  
  };

  const handlePlayAgain = () => {
    // setUserGuess('');
    // setWinner(null);
    // setShow(false);
     navigate(0)
  };

  const handleBattle = () => {
    const pokemon1HP = pokemon1stat.stats[0].base_stat;
    const pokemon2HP = pokemon2stat.stats[0].base_stat;

    const correctAnswer = pokemon1HP > pokemon2HP ? pokemon1.name : pokemon2.name;

    setWinner(pokemon1HP > pokemon2HP ? pokemon1 : pokemon2);
    setShow(true)
    onAddToHistory(pokemon1, pokemon2, userGuess, correctAnswer);
  };

  return (
    <div>
      <h2>Game</h2>
      {pokemon1 && pokemon2 && (
        <div>
          
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
          {
             show &&  <div>
                        <div>{pokemon1stat.name} (HP: {pokemon1stat.stats[0].base_stat})</div>
                        <div>{pokemon2stat.name} (HP: {pokemon2stat.stats[0].base_stat})</div>
                      </div>
          }
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
