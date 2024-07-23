//Api Endpoints for Directors

import { Router } from "express";
import { GetPathToDBFile } from "../helpers/getPathToDB.helper.js";
import { readFileFs } from "../helpers/readFileFs.helper.js";
import { writeFileFs } from "../helpers/writeFileFs.helper.js";


export const routerDirectors = Router();

const pathToDBFile = GetPathToDBFile("../../data/anime-industry.json")

routerDirectors.post("/", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);

    const newDirector = {
        id: animesIndustry.directors.length + 1,
        name: req.body.name
    }

    animesIndustry.directors.push(newDirector);

    await writeFileFs(pathToDBFile, animesIndustry);

    res.status(201).json({ message: "Director creado exitosamente", director: newDirector });
})

routerDirectors.get("/", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    res.status(200).json(animesIndustry.directors);
})

routerDirectors.get("/:id", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);  
    const directorFound = animesIndustry.directors.find((d) => d.id === parseInt(req.params.id))

    if (!directorFound) return res.status(404).json({ message: "Director no encontrado" });

    res.status(200).json(directorFound);
})

routerDirectors.put("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const indexDIrector = animesIndustry.directors.findIndex(
    (d) => d.id === parseInt(req.params.id)
  );

  if (!indexDIrector)
    return res.status(404).json({ message: "Director no encontrado" });

  const updateDirector = {
    ...animesIndustry.directors[indexDIrector],
    name: req.body.name,
  };

  animesIndustry.directors[indexStudio] = updateDirector;

  await writeFileFs(pathToDBFile, animesIndustry);

  res
    .status(200)
    .json({ message: "Director actualizado exitosamente", director: updateDirector});
});

routerStudios.delete("/:id", async (req, res) => {
  const animesIndustry = await readFileFs(pathToDBFile);
  const indexDIrector = animesIndustry.directors.findIndex(
    (d) => d.id == parseInt(req.params.id)
  );

  if (!indexDIrector)
    return res.status(404).json({ message: "Director no encontrado" });

  animesIndustry.directors.splice(indexDIrector, 1);

  await writeFileFs(pathToDBFile, animesIndustry);

  res.status(200).json("Director eliminado exitosamente");
});
