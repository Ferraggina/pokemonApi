const axios = require("axios");
const { Type } = require("../db");
const { URL_API_POKE_TYPE } = require("../../utils/constantesGlobales");
const { Router } = require("express");
const router = Router();

// const getAllTypes = async () => {
//   try {
//     const typesDb = await Type.findAll({
//       attributes: ["name"],
//     });
//     if (typesDb.length === 0) {
//       const typesPokemonApi = await axios.get(URL_API_POKE_TYPE);
//       typesCreatedInDb = typesPokemonApi.data.results.map((type) =>
//         Type.create({ name: type.name })
//       ); //guardo types en base de datos
//       typesCreatedInDb = await axios.all(typesCreatedInDb);
//       const getTypesApi = getTypes(typesCreatedInDb);
//       return getTypesApi;
//     } else {
//       const getTypesPokeDb = getTypes(typesDb);
//       return getTypesPokeDb;
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
// const getTypes = (arr) => {
//   let types = arr.map((type) => type.name);
//   return types;
// };
// router.get("/", async (req, res) => {
//   try {
//     let currentType = await getAllTypes();
//     currentType = currentType.filter(
//       (type) => type !== "unknown" && type !== "shadow"
//     );
//     return res.status(200).send(currentType);
//   } catch (error) {
//     return res.status(400).send("No se encontraron tipos");
//   }
// });
// module.exports = router;
router.get("/", async (req, res, next) => {
  let typeDb = await Type.findAll();

  try {
    if (typeDb.length === 0) {
      let typeApi = await axios.get(URL_API_POKE_TYPE);

      typeApi = typeApi.data.results.map((e) => {
        return { name: e.name };
      });

      typeDb = await Type.bulkCreate(typeApi);
    }
    res.json(typeDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
