import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
type headerDataType={
  name:string;
  url:string;
}[];

const Header = () => {

 const headerData:headerDataType=[
      {
        name:'Game',
        url:'/',
      },
      {
        name:'History',
        url:'/history',
      },
      {
        name:'Pokedex',
        url:'/pokedex',
      }
    ]


  return (
    <header className='header'>
        <ul className='nav'>
           {
            headerData.map((data,index)=>{
              return <li key={index} className='nav-item'>
                  <NavLink to={data.url} className='nav-link' >{data.name}</NavLink>
           </li>
            })
           }
          
        </ul>
        
       
        
    </header>
  )
}

export default Header