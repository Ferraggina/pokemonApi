import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../../Redux/Action/index";
import "../Detail/detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    setTimeout(() => dispatch(getPokemonById(id)), 2000);
  }, [dispatch, id]);

  return (
    <div>
      <nav className="buttonBack">
        <Link to="/home">
          <button className="boton">VOLVER</button>
        </Link>
      </nav>

      {pokemon.length === 0 ? (
        <div className="loaderDetail">
          <img
            src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif"
            alt="no funciona la imagen"
          />
          <p>CARGANDO...</p>
        </div>
      ) : (
        <div className="containerDetail">
          <h1 className="titleDetail">{pokemon[0].name.toUpperCase()}</h1>

          <div className="detailRow">
            <div className="detailRow">
              <div className="detail">
                <label>Salud: {pokemon[0].hp}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Fuerza: {pokemon[0].str}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Defensa: {pokemon[0].def}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Velocidad: {pokemon[0].spd}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Altura: {pokemon[0].height}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Peso: {pokemon[0].weight}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>
                  Tipo:
                  {pokemon[0]?.types.length === 1
                    ? pokemon[0].types
                    : `${pokemon[0].types[0]} & ${pokemon[0].types[1]}`}
                </label>
              </div>
            </div>
            <div className="detailImg">
              <img
                className="size-img"
                src={pokemon[0].image}
                alt="no funciona la imagen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
