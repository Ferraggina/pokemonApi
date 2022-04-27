import React from "react";
import { Link } from "react-router-dom";
import "../Card/card.css";

export default function Card({ id, name, image, str, types, hp, spd, def }) {
  return (
    <div key={id} className="cardContainer">
      <Link to={"/home/" + id}>
        <div className="card">
          <h2 className="pokeName">{name[0].toUpperCase() + name.slice(1)}</h2>
          <img className="pokeImage" src={image} alt="La imagen no carga" />
          <div className="pokeTypes">
            {types.length > 0 &&
              types.map((t) => <p className="eachType">{t.toUpperCase()}</p>)}
            <div className="hpDiv">
              <p className="hp">
                <span>HP:{hp}</span>
              </p>
            </div>
          </div>
          <div className="pokeStats">
            <div>
              <p>Ataque:- {str} - </p>
            </div>
            <div>
              <p>Defensa:- {def} - </p>
            </div>
            <div>
              <p>Velocidad: {spd} </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
