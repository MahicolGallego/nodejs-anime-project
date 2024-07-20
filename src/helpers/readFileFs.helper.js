import { promises as fs } from "fs";

export async function readFileFs(pathToDBFile){
    try {
        const data = await fs.readFile(pathToDBFile, 'utf8')
        return JSON.parse(data);
    } catch (error) {
        throw new Error (`Error en la respuesta: ${error}`)
    }
}