//Api Endpoints for Studios

import { Router } from "express";
import { GetPathToDBFile } from "../helpers/getPathToDB.helper.js";
import { readFileFs } from "../helpers/readFileFs.helper.js";
import { writeFileFs } from "../helpers/writeFileFs.helper.js";

export const routerStudios = Router();

const pathToDBFile = GetPathToDBFile("../../data/anime-industry.json")


routerStudios.post("/", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    const newStudio = {
        id: animesIndustry.studios.length + 1,
        name: req.body.name,
    }
    animesIndustry.studios.push(newStudio);
    await writeFileFs(pathToDBFile, animesIndustry)
    res.status(201).json({message: "Studio creado exitosamente", studio: newStudio})
})

routerStudios.get("/", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    res.status(200).json(animesIndustry.studios)
})

routerStudios.get("/:id", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    const studioFound = animesIndustry.studios.find((s) => s.id === parseInt(req.params.id));

    if (!studioFound) return res.status(404).json({ message: "Studio no encontrado" });

    res.status(200).json(studioFound);
})

routerStudios.put("/:id", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    const indexStudio = animesIndustry.studios.findIndex((s) => s.id === parseInt(req.params.id))

    if (!indexStudio) return res.status(404).json({ message: "Studio no encontrado" });

    const updateSudio = {
        ...animesIndustry.studios[indexStudio],
        name: req.body.name
    }

    animesIndustry.studios[indexStudio] = updateSudio

    await writeFileFs(pathToDBFile, animeIndustry)

    res.status(200).json({ message: "Studio actualizado exitosamente", studio: updateSudio });
    
})

routerStudios.delete("/:id", async (req, res) => {
    const animesIndustry = await readFileFs(pathToDBFile);
    const indexStudio = animeIndustry.studios.findIndex((s) => s.id == parseInt(req.params.id));

    if (!indexStudio) return res.status(404).json({ message: "Studio no encontrado" })
    
    animesIndustry.studios.splice(indexStudio, 1)

    await writeFileFs(pathToDBFile, animesIndustry)

    res.status(200).json("Studio eliminado exitosamente")
})

