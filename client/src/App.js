import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Detail from "./Components/Detail/Detail";
import LandingPage from "./Components/Landing/Landing";
import PokemonCreated from "./Components/PokemonCreated/PokemonCreated";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/pokemons" element={<PokemonCreated />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
