import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <ul>
            <li>
               <Link to='/'>Home</Link>
            </li>
            <li>
            <Link to='/history'>history</Link>
            </li>
            <li>
            <Link to='/pokedex'>pokedex</Link>
            </li>
        </ul>
        
       
        
    </header>
  )
}

export default Header