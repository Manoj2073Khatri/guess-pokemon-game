import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Game from '../components/Game'
import SearchBox, { Pokemon } from '../components/SearchBox'


const GuessGame = () => {
    const [selectedPokemon1, setSelectedPokemon1] = useState<any>();
    const [selectedPokemon2, setSelectedPokemon2] = useState<any>();

  
   const handleSelect=(pokemon:Pokemon)=>{
     
       if (!selectedPokemon1) {
        setSelectedPokemon1(pokemon);
        } else if (!selectedPokemon2) {
        setSelectedPokemon2(pokemon);
        }
   }

   const addToHistory = (pokemon1: Pokemon, pokemon2: Pokemon, userGuess: string, correctAnswer: string) =>{
    
         const data = {
            pokemon1,
            pokemon2,
            userGuess,
            correctAnswer,
          };
          const localStorageData = localStorage.getItem('history');
          const existingData = localStorageData ? JSON.parse(localStorageData) : [];
          localStorage.setItem('history', JSON.stringify([...existingData, data]));

   }

  return (
    <div>
        <h1>Guess Game</h1>
        <SearchBox onSelect={handleSelect}/>
        {
            selectedPokemon1 && selectedPokemon2 && <Game pokemon1={selectedPokemon1} pokemon2={selectedPokemon2} onAddToHistory={addToHistory}/>
        }
    </div>
  )
}

export default GuessGame;