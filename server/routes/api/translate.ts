import deepl from "deepl-node";
import fs from "fs";


interface Translation {
    id: number,
    description: string,
    translation?: string
}

function ensureJsonFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");
        console.log("JSON file created:", filePath);
    }
}

// Function to read JSON file
function readJsonFile<T>(path: string): T | null {
    ensureJsonFileExists(path);
    try {
        const data = fs.readFileSync(path, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return null;
    }
}

// Function to write JSON file
function writeJsonFile<T>(path: string, data: T): void {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
        fs.fsyncSync(fs.openSync(path, "r+")); // Ensure flush to disk
        console.log("File successfully written!");
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }
}


export default defineEventHandler(async (event) => {
    const filePath = "./translations.json"

    const body = await readBody(event)
    if (!body || !body.id) {
        return {
            success: false,
            message: "Must provide: id, description"
        }
    }

    const jsonData = readJsonFile<Translation[]>(filePath);
    if (jsonData) {
        const found = jsonData.find((i) => i.id === body.id)
        if (found !== undefined) {
            console.log('Entry found, returning')
            return {
                success: true,
                data: found
            }
        }
        console.log('Entry not found, translating')

        const translator = new deepl.Translator("85d0a512-2c8d-49a7-91b6-433533887312:fx")
        let result = await translator.translateText(body.description, null, 'pt-BR')

        let translatedContent: Translation;

        if (Array.isArray(result)) {
            const firstResult = result.at(0)
            translatedContent = {
                id: body.id,
                description: body.description,
                translation: firstResult?.text,
            }
        } else {
            translatedContent = {
                id: body.id,
                description: body.description,
                translation: result?.text,
            }
        }
        // 85d0a512-2c8d-49a7-91b6-433533887312:fx
        // DeepL

        jsonData.push(translatedContent)
        // Write back to file
        writeJsonFile(filePath, jsonData);
        return {
            success: true,
            data: translatedContent
        }
    }

});