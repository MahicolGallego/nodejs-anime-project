//Api Endpoints for Animes
// import express from "express";
import { Router} from "express";
import {promises as fs } from "fs"
import path from "path";
import { fileURLToPath } from "url";

// const routerAnime = express.Router();
export const routerAnimes = Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const animesIndustryFilePath = path.join(_dirname, "../../data/anime-industry.json")

const readAnimesFs = async () => {
  try {
    const animesIndustry = await fs.readFile(animesIndustryFilePath);
    return JSON.parse(animesIndustry);
  } catch (err) {
    throw new Error(`Error en la request: ${err}`);
  }
}

const writeAnimesFs = async (animesIndustry) => {
  try {
    await fs.writeFile(animesIndustryFilePath, JSON.stringify(animesIndustry, null, 2));
    return;
  } catch (err) {
    throw new Error(`Error en la request: ${err}`);
  }
}

routerAnimes.post("/", async (req, res) => {
  const animesIndustry = await readAnimesFs();
  const newAnime = {
    id: animesIndustry.animes.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    //studioId: req.body.studioId,
  }

  animesIndustry.animes.push(newAnime);
  await writeAnimesFs(animesIndustry);

  res.status(201).json({message: "Anime creado exitosamente", anime: newAnime});
})

routerAnimes.get("/", async () => {
  const allAnimes = await readAnimesFs();
  return allAnimes.animes.json();
})

routerAnimes.get("/:id", async (req, res) => {
  const animesIndustry = await readAnimesFs();
  const anime = animesIndustry.animes.find((a) => a.id === parseInt(req.params.id))

  if(!anime) return res.status(404).send("Anime no encontrado");

  res.json(anime);
})

routerAnimes.put("/:id", async (req, res) => {
  const animesIndustry = await readAnimesFs();
  const indexAnime = animesIndustry.animes.findIndex((a) => a.id === parseInt(req.params.id))

  if(indexAnime === -1) return res.status(404).send("Anime no encontrado");

  const updateAnime = {
    ...animesIndustry.animes[indexAnime],
    title: req.body.title,
    genre: req.body.genre
  }

  animesIndustry.animes[indexAnime] = updateAnime;

  await writeAnimesFs(animesIndustry);

  res.status(201).json({message: "Anime actualizado exitosamente", anime: updateAnime});
})

routerAnimes.delete("/:id", async (req, res) => {
  let animesIndustry = await readAnimesFs();
  const indexAnime = animesIndustry.animes.findIndex((a) => a.id === parseInt(req.params.id))

  if(indexAnime === -1) return res.status(404).send("Anime no encontrado");

  // animesIndustry = animesIndustry.animes.filter((a) => a.id !== anime.id);
  animesIndustry.animes.splice(indexAnime, 1);
  console.log(animesIndustry);
  await writeAnimesFs(animesIndustry);

  res.send("Anime eliminado con exito")
})
