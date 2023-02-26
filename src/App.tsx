import { useState } from 'react'
import './App.scss'
import { Route, Routes } from "react-router-dom";


import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import GuessGame from './pages/GuessGame/GuessGame';
import Pokedex from './pages/Pokedex/Pokedex';
import History from './pages/History/History';



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<GuessGame />} />
          <Route path="/history" element={<History />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
