import {
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  POST_POKEMON,
  ORDER_BY_DEFAULT,
  ORDER_BY_NAME,
  ORDER_BY_SRENGTH,
  FILTER_ALL,
} from "../Action/Constantes";

const initialState = {
  pokemons: [],
  types: [],
  pokemonsCopia: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopia: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case POST_POKEMON:
      return {
        ...state,
      };
    case FILTER_ALL:
      const allPokemons = state.pokemonsCopia;
      const filterType =
        action.payload.type === "all"
          ? allPokemons
          : allPokemons.filter((e) => e.types.includes(action.payload.type));
      const filterOrigin =
        action.payload.origin === "db"
          ? filterType.filter((e) => e.createdInDb)
          : filterType.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons: action.payload.origin === "all" ? filterType : filterOrigin,
      };
    case ORDER_BY_DEFAULT:
      let dbArray = state.pokemons.filter((e) => e.id.length > 5);
      let apiArray = state.pokemons.filter((e) => typeof e.id === "number");
      let defaulArr = apiArray.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (b.id > a.id) {
          return -1;
        }
        return 0;
      });
      defaulArr = [...dbArray, ...apiArray];
      return {
        ...state,
        pokemons: defaulArr,
      };
    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };
    case ORDER_BY_SRENGTH:
      let sortedArrSren =
        action.payload === "strMax"
          ? state.pokemons.sort(function (a, b) {
              return b.str - a.str;
            })
          : state.pokemons.sort(function (a, b) {
              return a.str - b.str;
            });
      return {
        ...state,
        pokemons: sortedArrSren,
      };

    default:
      return state;
  }
}
export default rootReducer;
