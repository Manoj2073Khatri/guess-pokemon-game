import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

export interface Pokemon {
  name: string;
  url: string;
}



function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const {isLoading, error, data, refetch}=useQuery('fetch data',async() =>await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`))

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    refetch()
    const { results } = data?.data;

    setPokemonList(results.filter((pokemon: Pokemon) => pokemon.name.includes(searchTerm)));
  };

  const handleSelect = (pokemon: Pokemon) => {
    setSearchTerm(pokemon.name);

  };

  return (
    <div>
      <label htmlFor="search">Search Pokemon:</label>
      <input type="text" id="search" value={searchTerm} onChange={handleInputChange} />
      {pokemonList.length > 0 && (
        <ul>
          {pokemonList.map((pokemon: Pokemon) => (
            <li key={pokemon.url} onClick={() => handleSelect(pokemon)}>
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
