import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../../Redux/Action/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonsByName(name));
    alert("Pokemon Encontrado!!");
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
