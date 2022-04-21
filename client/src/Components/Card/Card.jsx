import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, str, types, hp, spd, def }) {
  return (
    <Link to={"/home/" + id}>
      <div key={id}>
        <div className="card">
          <p className="hp">
            <span>HP</span>
            {hp}
          </p>
          <img className="pokeImagen" src={image} alt="La imagen no carga" />
          <h2 className="pokeName">{name[0].toUpperCase() + name.slice(1)}</h2>
          <div className="pokeTypes">
            {types.length === 1 ? (
              <span>
                <img src={types[0]} alt={`${types[0]}`} />
              </span>
            ) : (
              <span>
                <img src={types[0]} alt={`${types[0]}`} />
                <img src={types[1]} alt={`${types[1]}`} />
              </span>
            )}
          </div>
          <div className="pokeStats">
            <div>
              <h3>{str}</h3>
              <p>Ataque</p>
            </div>
            <div>
              <h3>{def}</h3>
              <p>Defensa</p>
            </div>
            <div>
              <h3>{spd}</h3>
              <p>Velocidad</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
