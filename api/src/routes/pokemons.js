const axios = require("axios");
const { Pokemon, Type } = require("../db");
const {
  URL_API_POKE,

  URL_API_POKE_ID_AND_NAME,
} = require("../../utils/constantesGlobales");
const { Router } = require("express");
const router = Router();
const getPokeApi = async () => {
  try {
    const totalPokeReq = await axios.get(URL_API_POKE);
    const totalPokeSubReq = totalPokeReq.data.results.map((obj) =>
      axios.get(obj.url)
    );
    const infoUrlPoke = await axios.all(totalPokeSubReq);

    let pokemons = infoUrlPoke.map((obj) => obj.data);
    let infoPokes = pokemons.map((pokemon) => objPokeApi(pokemon));
    return infoPokes;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPokeDb = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getAllPoke = async () => {
  try {
    const apiPokeData = await getPokeApi();
    const dbPokeData = await getPokeDb();
    return [...apiPokeData, ...dbPokeData];
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getPokeByName = async (name) => {
  try {
    const searchPokeByNameDb = await Pokemon.findOne({
      where: { name },
      include: { model: Type },
    });
    if (searchPokeByNameDb) {
      let pokeDbName = {
        id: searchPokeByNameDb.id,
        name: searchPokeByNameDb.name,
        life: searchPokeByNameDb.life,
        attack: searchPokeByNameDb.attack,
        defense: searchPokeByNameDb.defense,
        speed: searchPokeByNameDb.speed,
        height: searchPokeByNameDb.height,
        weight: searchPokeByNameDb.weight,
        sprite: searchPokeByNameDb.sprite,
        types:
          searchPokeByNameDb.types.length < 2
            ? [searchPokeByNameDb.types[0]]
            : [searchPokeByNameDb.types[0], searchPokeByNameDb.types[1]],
      };
      return pokeDbName;
    } else {
      const searchPokeApiName = await axios.get(
        `${URL_API_POKE_ID_AND_NAME}${name.toLowerCase()}`
      );
      const foundPokeApiName = objPokeApi(searchPokeApiName.data);
      return foundPokeApiName;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getPokeById = async (id) => {
  try {
    if (id.length > 2) {
      const searchPokeIdDb = await Pokemon.findOne({
        where: { id },
        include: Type,
      });
      console.log("Pokemon base de datos", searchPokeIdDb);
      let pokeDbId = {
        id: searchPokeIdDb.id,
        name: searchPokeIdDb.name,
        life: searchPokeIdDb.life,
        attack: searchPokeIdDb.attack,
        defense: searchPokeIdDb.defense,
        speed: searchPokeIdDb.speed,
        height: searchPokeIdDb.height,
        weight: searchPokeIdDb.weight,
        sprite: searchPokeIdDB.sprite,
        types:
          searchPokeIdDB.types.length < 2
            ? [searchPokeIdDB.types[0]]
            : [searchPokeIdDB.types[0], searchPokeIdDB.types[1]],
      };
      return pokeDbId;
    } else {
      const searchPokeApiId = await axios.get(
        `${URL_API_POKE_ID_AND_NAME}${id.toString()}`
      );
      const foundPokeApiId = objPokeApi(searchPokeApiId.data);
      return foundPokeApiId;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const objPokeApi = (poke) => {
  const objPokeApi = {
    id: poke.id,
    name: poke.name,
    life: poke.stats[0].base_stat,
    attack: poke.stats[1].base_stat,
    defense: poke.stats[2].base_stat,
    speed: poke.stats[5].base_stat,
    height: poke.height,
    weight: poke.weight,
    sprite: poke.sprites.other.dream_world.front_default,
    types:
      poke.types.length < 2
        ? [{ name: poke.types[0].type.name }]
        : [
            { name: poke.types[0].type.name },
            { name: poke.types[1].type.name },
          ],
  };
  return objPokeApi;
};

const postPokeDb = async (pokeData) => {
  try {
    const {
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      sprite,
      types,
    } = pokeData;
    const miPoke = await Pokemon.create({
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      sprite,
    });
    const pokeTypeDb = await Type.findAll({
      where: { name: types },
    });
    let createdMyPoke = miPoke.addType(pokeTypeDb);
    return createdMyPoke;
  } catch (error) {
    console.log(error);
    return error;
  }
};
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(200).send(await getAllPoke());
    } else {
      const pokeFoundName = await getPokeByName(name);
      if (pokeFoundName) {
        return res.status(200).json(pokeFoundName);
      }
    }
  } catch (error) {
    console.log("entro error");
    return res.status(404).send("Pokemon not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const pokeFoundId = await getPokeById(id);
    if (pokeFoundId) return res.status(200).json(pokeFoundId);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Pokemon not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const pokeData = req.body;
    await postPokeDb(pokeData);
    return res.status(200).send("Pokemon creado con exito");
  } catch (error) {
    res.status(400).send("Fallo al crear Pokemon");
  }
});
module.exports = router;
