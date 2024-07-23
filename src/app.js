import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middlewares/error.handler.js";
import { routerAnimes } from "./routes/animes.js";
import { routerDirectors } from "./routes/directors.js";
import { routerStudios } from "./routes/studios.js";
import { routerCharacters } from "./routes/characters.js";

const app = express();
//Para poder usar las variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use("/animes", routerAnimes);
app.use("/studios", routerStudios)
app.use("/directors", routerDirectors)
app.use("/characters", routerCharacters)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`El puerto esta siendo escuchado and running at http://localhost:${PORT}`)
})
