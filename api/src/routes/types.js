const axios = require("axios");
const { Type } = require("../db");
const { URL_API_POKE_TYPE } = require("../../utils/constantesGlobales");
const { Router } = require("express");
const router = Router();

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
