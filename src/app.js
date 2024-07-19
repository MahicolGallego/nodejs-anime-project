import express from "express";
import dotenv from "dotenv"
import errorHandler from "./middlewares/error.handler.js";
import { routerAnimes } from "./routes/animes.js";

const app = express();
//Para poder usar las variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(errorHandler)
app.use("/animes", routerAnimes);

app.listen(PORT, () => {
  console.log(`El puerto esta siendo escuchado and running at http://localhost:${PORT}`)
})
