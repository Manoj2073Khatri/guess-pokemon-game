import { useState } from 'react'
import './App.scss'
import { Route, Routes } from "react-router-dom";


import Header from './components/Header';
import Layout from './components/Layout';
import GuessGame from './pages/guessGame';
import Pokedex from './pages/pokeDex';



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<GuessGame />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
