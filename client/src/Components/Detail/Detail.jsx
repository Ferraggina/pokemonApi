import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../../Redux/Action/index";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const pokemon = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonById(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      <nav className="navBar">
        <Link to="/home"></Link>
        <Link to="/home">
          <button className="buttonNav">Volver</button>
        </Link>
      </nav>

      {pokemon.length > 0 ? (
        <div className="container">
          <h1 className="title">{pokemon[0].name}</h1>
          <span className="title2">ID:{pokemon[0].id}</span>
          <div className="detailRow">
            <div className="detail">
              <label>Salud:{pokemon[0].hp}</label>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Fuerza:{pokemon[0].str}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Defensa:{pokemon[0].def}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Velocidad:{pokemon[0].spd}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Altura:{pokemon[0].height}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>Peso:{pokemon[0].weight}</label>
              </div>
            </div>
            <div className="detailRow">
              <div className="detail">
                <label>
                  Tipo:
                  {pokemon[0]?.types.length === 1
                    ? pokemon[0].types[0].name
                    : `${pokemon[0].types[0].name} & ${pokemon[0].types[1].name}`}
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
      ) : (
        <p>Cargando</p>
      )}
    </div>
  );
}
