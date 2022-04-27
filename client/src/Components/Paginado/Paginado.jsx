import React from "react";
import "../Paginado/paginado.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map((number) => {
          return (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
