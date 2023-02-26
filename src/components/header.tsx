import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/history'>history</Link>
        <Link to='/pokedex'>pokedex</Link>
    </div>
  )
}

export default Header