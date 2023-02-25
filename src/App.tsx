import { useState } from 'react'
import './App.scss'
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Layout from './components/layout';
import GuessGame from './pages/guessGame';
import Pokedex from './pages/pokeDex';



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<GuessGame />} />
          <Route path="claimDetails" element={<Pokedex />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
