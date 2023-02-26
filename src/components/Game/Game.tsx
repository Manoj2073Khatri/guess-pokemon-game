import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useQueries, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './Game.scss'
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
    <div className='Game_wrapper'>
      <h3 className='heading'>Select your guess</h3>
      {pokemon1 && pokemon2 && (
        <div  className='Game_wrapper-body'>
          
          <div className='radio'>
          
              <input type="radio" name="guess" value={pokemon1.name} onChange={handleUserGuess} />
              <label> 
                {pokemon1.name}
            </label>
          </div>
          <div className='radio'>
           
              <input type="radio" name="guess" value={pokemon2.name} onChange={handleUserGuess} />
              <label>
                {pokemon2.name}
            </label>
          </div>

          <button className='button' onClick={handleBattle}>Battle</button>
          {
             show &&  <div className='stats'>
                        <div>{pokemon1stat.name} (HP: {pokemon1stat.stats[0].base_stat})</div>
                        <div>{pokemon2stat.name} (HP: {pokemon2stat.stats[0].base_stat})</div>
                      </div>
          }
          {winner && (
            <div className='result'>
             <p className='winner'> {winner.name} wins!</p>
             <p className='guess'> {userGuess.toLowerCase() === winner.name.toLowerCase() ? ' You guessed correctly!' : ' You guessed incorrectly!'}</p>
              <button onClick={handlePlayAgain}>Play again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
