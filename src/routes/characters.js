//Api Endpoints for Characters

import { Router } from "express";
import { GetPathToDBFile } from "../helpers/getPathToDB.helper";

export const routerCharacters = Router();

const pathToDBFile = GetPathToDBFile("../../data/anime-industry.json");

routerCharacters.post("/", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const newCharacter = {
    id: animesIndustry.characters.length + 1,
    name: req.body.name,
    animeId: req.body.animeId,
  };

  animesIndustry.characters.push(newCharacter);
  await writeFileFs(pathToDBFile, animesIndustry);

  res
    .status(201)
    .json({ message: "Personaje creado exitosamente", anime: newCharacter});
});

routerCharacters.get("/", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  res.status(200).json(animesIndustry.characters);
});

routerCharacters.get("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const character = animesIndustry.characters.find(
    (c) => c.id === parseInt(req.params.id)
  );

  if (!anime) return res.status(404).send("Personaje no encontrado");

  res.status(200).json(character);
});

routerCharacters.put("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const indexCharacter = animesIndustry.characters.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );

  if (indexCharacter === -1) return res.status(404).send("Personaje no encontrado");

  const updateCharacter = {
    ...animesIndustry.characters[indexCharacter],
    name: req.body.name,
    animeId: req.body.animeId,
  };

  animesIndustry.characters[indexCharacter] = updateCharacter;

  await writeFileFs(pathToDBFile, animesIndustry);

  res
    .status(200)
    .json({ message: "Personaje actualizado exitosamente", anime: updateAnime });
});

routerCharacters.delete("/:id", async (req, res) => {
  let animesIndustry = await readFileFs(pathToDBFile);
  const indexCharacter = animesIndustry.characters.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );

  if (indexCharacter === -1) return res.status(404).send("Personaje no encontrado");

  // animesIndustry = animesIndustry.animes.filter((a) => a.id !== anime.id);
  animesIndustry.characters.splice(indexCharacter, 1);
  // console.log(animesIndustry);
  await writeFileFs(pathToDBFile, animesIndustry);

  res.status(200).json({ message: "Personaje eliminado exitosamente" });
});


