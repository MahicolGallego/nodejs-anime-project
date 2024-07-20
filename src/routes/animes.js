//Api Endpoints for Animes
//import express from "express";
import { Router } from "express";
import { GetPathToDBFile } from "../helpers/getPathToDB.helper.js";
import { readFileFs } from "../helpers/readFileFs.helper.js";
import { writeFileFs } from "../helpers/writeFileFs.helper.js";

// export const routerAnime = express.Router();

export const routerAnimes = Router();

// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename)

// const pathToDBFile = path.join(_dirname, "../../data/anime-industry.json")

const pathToDBFile = GetPathToDBFile("../../data/anime-industry.json");

// const readAnimesFs = async () => {
//   try {
//     const animesIndustry = await fs.readFile(animesIndustryFilePath);
//     return JSON.parse(animesIndustry);
//   } catch (err) {
//     throw new Error(`Error en la request: ${err}`);
//   }
// }

// const writeAnimesFs = async (animesIndustry) => {
//   try {
//     await fs.writeFile(animesIndustryFilePath, JSON.stringify(animesIndustry, null, 2));
//     return;
//   } catch (err) {
//     throw new Error(`Error en la request: ${err}`);
//   }
// }

routerAnimes.post("/", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const newAnime = {
    id: animesIndustry.animes.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    studioId: req.body.studioId,
  }

  animesIndustry.animes.push(newAnime);
  await writeFileFs(pathToDBFile, animesIndustry);

  res.status(201).json({message: "Anime creado exitosamente", anime: newAnime});
})

routerAnimes.get("/", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  res.status(200).json(animesIndustry.animes);
})

routerAnimes.get("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const anime = animesIndustry.animes.find((a) => a.id === parseInt(req.params.id))

  if(!anime) return res.status(404).send("Anime no encontrado");

  res.status(200).json(anime);
})

routerAnimes.put("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const indexAnime = animesIndustry.animes.findIndex((a) => a.id === parseInt(req.params.id))

  if(indexAnime === -1) return res.status(404).send("Anime no encontrado");

  const updateAnime = {
    ...animesIndustry.animes[indexAnime],
    title: req.body.title,
    genre: req.body.genre,
    studioId: req.body.studioId,
  }

  animesIndustry.animes[indexAnime] = updateAnime;

  await writeFileFs(pathToDBFile, animesIndustry);

  res.status(200).json({message: "Anime actualizado exitosamente", anime: updateAnime});
})

routerAnimes.delete("/:id", async (req, res) => {
  let animesIndustry = await readFileFs(pathToDBFile);
  const indexAnime = animesIndustry.animes.findIndex((a) => a.id === parseInt(req.params.id))

  if(indexAnime === -1) return res.status(404).send("Anime no encontrado");

  // animesIndustry = animesIndustry.animes.filter((a) => a.id !== anime.id);
  animesIndustry.animes.splice(indexAnime, 1);
  // console.log(animesIndustry);
  await writeFileFs(pathToDBFile, animesIndustry);

  res.status(200).json({ message: "Anime eliminado con exito"})
})
