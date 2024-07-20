import { promises as fs } from "fs"

export const writeFileFs = async (pathToDBFile, dataToOverWrite) => {
    try {
        await fs.writeFile(pathToDBFile, JSON.stringify(dataToOverWrite, null, 2), 'utf8')
    } catch (error) {
        throw new Error(`Error en la respuesta: ${error}`)
    }
}