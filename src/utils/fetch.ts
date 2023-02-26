import axios from 'axios';

 export const fetchData=async()=> {
    const { data } = await axios.get<{}>('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
    return data;
  }

