import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import './SearchBox.scss'


export interface Pokemon {
  name: string;
  url: string;
}

interface SearchBoxProps {
    onSelect: (pokemon: Pokemon) => void;
  }
  

function SearchBox({ onSelect }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [count,setCount]=useState<number>(0);

  const {isLoading, error, data, refetch}=useQuery('fetch data',async() =>await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`))

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    refetch()
    const { results } = data?.data;
    setPokemonList(results.filter((pokemon: Pokemon) => pokemon.name.includes(searchTerm)));
  };


  useEffect(() => {
   
    let isMounted = true;
    if(isMounted && count===2){
        setSearchTerm('');
        setPokemonList([]);
    }
    return () => {
     isMounted=false;
    }
  }, [count])
  
  const handleSelect = (pokemon:Pokemon) => {
    setSearchTerm(pokemon.name);
    onSelect(pokemon);
    setCount(count+1);
   
  };

  return (
    <div className='searchComponent'>
      <input placeholder='Search Pokemon' type="text" id="search" value={searchTerm} onChange={handleInputChange} />
    
        {pokemonList.length > 0 && (
          <ul className='pokemonList'>
            {pokemonList.map((pokemon: Pokemon) => (
              <li className='pokemonList-name' key={pokemon.url} onClick={() => handleSelect(pokemon)}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
    </div>

    
  );
}

export default SearchBox;
