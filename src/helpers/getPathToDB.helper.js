import path from "path";
import { fileURLToPath } from "url";

export const GetPathToDBFile = (pathToDBFileFromCurrentFile) => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename)
    return path.join(_dirname, pathToDBFileFromCurrentFile)
}