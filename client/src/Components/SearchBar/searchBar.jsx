import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName, getPokemons } from "../../Redux/Action/index";
import "../SearchBar/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(" ");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonsByName(name));
  }
  return (
    <div className="busca">
      <input
        className="buscador"
        id="bt"
        type="text"
        placeholder="Buscar..."
        required
        onChange={(e) => handleImputChange(e)}
      />
      <button
        className="buscador"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
