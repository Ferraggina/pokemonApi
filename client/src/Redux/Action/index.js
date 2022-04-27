import {
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  ORDER_BY_DEFAULT,
  ORDER_BY_NAME,
  ORDER_BY_SRENGTH,
  FILTER_ALL,
} from "./Constantes";
import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMONS,

      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}
export function postPokemon(payload) {
  return async function () {
    try {
      var existentPokemon = await axios.get(
        `/pokemons?name=${payload.name.toLowerCase()}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      if (existentPokemon) {
        return alert("El pokemon con ese nombre ya existe, elija otro");
      } else {
        alert("Pokemon Creado");
        var json = await axios.post("http://localhost:3001/pokemons", payload);

        return json;
      }
    }
  };
}

export function filterPokemonsByType(payload) {
  console.log(payload);
  return {
    type: FILTER_ALL,
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: FILTER_ALL,
    payload,
  };
}
export function orderByDefault(payload) {
  return {
    type: ORDER_BY_DEFAULT,
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
export function orderByStrength(payload) {
  return {
    type: ORDER_BY_SRENGTH,
    payload,
  };
}
export function getPokemonsByName(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/pokemons?name=${payload}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      if (json) {
        return dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: json.data,
        });
      } else return alert("Pokemon no encontrado");
    }
  };
}
export function getPokemonById(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${payload}`);
      console.log(json.data);
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
