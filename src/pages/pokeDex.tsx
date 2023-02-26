import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

type PokemonType = {
  name: string;
  hp: number;
  moves: string[];
};

const Pokedex= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState<PokemonType[]>([]);
  
  const { data, isLoading, error, refetch } = useQuery<any>('myData', async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    const data = await response.data;
    const pokemon = {
        name: data?.name,
        hp: data?.stats[0].base_stat,
        moves: data?.moves.slice(0, 4).map((move: any) => move.move.name),
      };
      setPokemonData([pokemon]);

  }, {
    enabled: false, // Disable the initial fetch
  });


  useEffect(() => {
    let isMounted = true;
    if(isMounted){
        const fetchData = async () => {
   
            refetch()
             console.log('data',data);
            
         };
     
         if (searchTerm) {
             console.log('url',`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
             console.log('search term',searchTerm)
            fetchData();
         }
    }

    return()=>{
        isMounted=false;
    }
  }, [searchTerm]);

 
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    setSearchTerm(input.value.toLowerCase());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search Pokemon" />
        <button type="submit">Search</button>
      </form>
      <div>
        {pokemonData && pokemonData?.map((pokemon: PokemonType) => (
          <div key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <p>HP: {pokemon.hp}</p>
            <p>Moves:</p>
            <ul>
              {pokemon.moves.map((move: string) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
