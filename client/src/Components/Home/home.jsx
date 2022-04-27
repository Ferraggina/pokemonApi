import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getPokemons,
  getPokemonsByName,
  getTypes,
  filterPokemonsByType,
  filterCreated,
  orderByName,
  orderByStrength,
  orderByDefault,
} from "../../Redux/Action/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import testeando from "../../assets/testeando.png";
import SearchBar from "../SearchBar/searchBar";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const [originType, setOriginType] = useState({
    origin: "all",
    type: "all",
  });
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  async function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    const currentOrder = order.split(" ").pop();
    if (currentOrder === "strMax" || currentOrder === "strMin") {
      dispatch(orderByStrength(currentOrder));
    } else if (currentOrder === "asc" || currentOrder === "desc") {
      dispatch(orderByName(currentOrder));
    } else {
      dispatch(orderByDefault());
    }
    dispatch(filterCreated(originType));
  }
  function handleFilterType(e) {
    setOriginType({
      ...originType,
      type: e.target.value,
    });
    dispatch(
      filterPokemonsByType({
        origin: originType.origin,
        type: e.target.value,
      })
    );
    const currentOrder = order.split(" ").pop();

    if (currentOrder === "strMax" || currentOrder === "strMin") {
      dispatch(orderByStrength(currentOrder));
    } else if (currentOrder === "asc" || currentOrder === "desc") {
      dispatch(orderByName(currentOrder));
    } else {
      dispatch(orderByDefault());
    }
    setCurrentPage(1);
  }
  function handleFilterCreated(e) {
    setOriginType({
      ...originType,
      origin: e.target.value,
    });
    dispatch(
      filterCreated({
        origin: e.target.value,
        type: originType.type,
      })
    );
    const currentOrder = order.split(" ").pop();
    if (currentOrder === "strMax" || currentOrder === "strMin") {
      dispatch(orderByStrength(currentOrder));
    } else if (currentOrder === "asc" || currentOrder === "desc") {
      dispatch(orderByName(currentOrder));
    } else {
      dispatch(orderByDefault());
    }
    setCurrentPage(1);
  }
  //   function handleOnClick() {
  //     window.location.reload(false);
  //   }
  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "strMax" || e.target.value === "strMin") {
      dispatch(orderByStrength(e.target.value));
    } else if (e.target.value === "asc" || e.target.value === "desc") {
      dispatch(orderByName(e.target.value));
    } else {
      dispatch(orderByDefault());
    }
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  //   function handleInputChangeSearch(e) {
  //     e.preventDefault();
  //     setName(e.target.value);
  //   }

  //   async function handleSumbitSearch(e) {
  //     e.preventDefault();
  //     if (name === "") return alert("Ingrese nombre del pokemon");
  //     else {
  //       dispatch(getPokemonsByName(name));
  //       setName("");
  //       setCurrentPage(1);
  //     }
  //   }
  return (
    <div className="container">
      <div className="nav">
        <div>
          <Link to="/home">
            <img src={testeando} alt="" onClick={(e) => handleClick(e)} />
          </Link>
          <div className="navItem">
            <li>
              <select name="selectBox" onChange={(e) => handleSort(e)}>
                <option value="def">Ordenar: Default</option>
                <option value="asc">Ordenar: A-Z</option>
                <option value="desc">Ordenar: Z-A</option>
                <option value="strMax">Ordenar: Max Fuerza</option>
                <option value="strMin">Ordenar: Min Fuerza</option>
              </select>
            </li>
            <li>
              <select name="selectBox" onChange={(e) => handleFilterCreated(e)}>
                <option value="all"> Todos Pokemons</option>
                <option value="api"> Originales Pokemons</option>
                <option value="db">Createdos Pokemons</option>
              </select>
            </li>
            <li>
              <select
                className="selectBox"
                onChange={(e) => handleFilterType(e)}
              >
                <option value="all">All Types</option>
                {allTypes?.map((e) => {
                  return (
                    <option value={e.name} key={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <Link to="/pokemons">
                <button>Crea Tu Pokemon</button>
              </Link>
            </li>
            <li>
              <button onClick={(e) => handleClick(e)}>Pokemons random</button>
            </li>
          </div>
          <div className="searchDiv">
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
        </div>
        <div className="fondo">
          <div className="cards">
            {currentPokemons.length === 0 ? (
              <h2 className="h2error">
                "There are no pokemons available. Try changing your filters"
              </h2>
            ) : (
              currentPokemons.map((e) => {
                return (
                  <Card
                    name={e.name}
                    key={e.id}
                    image={e.image}
                    str={e.str}
                    types={e.types}
                    spd={e.spd}
                    def={e.def}
                    hp={e.hp}
                    id={e.id}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="paginado">
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        </div>
      </div>
    </div>
  );
}
