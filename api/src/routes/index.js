const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRoute = require("./types");
const pokemonsRoute = require("./pokemons");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRoute); //aqui expongo las rutas de pokemons
router.use("/types", typesRoute); //aqui expongo las rutas de types

module.exports = router;
