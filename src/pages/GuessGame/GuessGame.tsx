import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Game from '../../components/Game/Game'
import SearchBox, { Pokemon } from '../../components/SearchBox/SearchBox'
import './GuessGame.scss'

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
   <>
    <div className='GuessGame-wrapper'>
       <div className='GuessGame-body'> 
               <h2 className='heading-top'>Guess Game</h2>
                <SearchBox onSelect={handleSelect}/>
                {
                    selectedPokemon1 && selectedPokemon2 && <Game pokemon1={selectedPokemon1} pokemon2={selectedPokemon2} onAddToHistory={addToHistory}/>
                }
       </div>

       <div className='steps'>
            <h4 className='heading'>Steps to play</h4>
            <ul>
                <li>Search the pokemon you want to select eg.(seel ,bulbasaur) or just type any letter you will be shown list of pokemon</li>
                <li>Must select two pokemon from list successively</li>
                <li>Then a radio button will appear stating to guess the pokemon that will win</li>
                <li>Start battle</li>
                <li>Results will be displayed</li>
            </ul>
    </div>

    </div>

   
   </>
  )
}

export default GuessGame;