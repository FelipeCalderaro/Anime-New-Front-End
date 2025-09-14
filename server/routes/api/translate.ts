import deepl from "deepl-node";
import fs from "fs";



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

async function translate(body: any) {
    try {

        const translator = new deepl.Translator("170d7b1c-c2c4-45c3-8536-ddf369e615be:fx")
        const loc = body.locale === 'en' ? 'en-US' : body.locale
        let result = await translator.translateText(body.description, null, loc)

        let translatedContent: any = {};

        if (Array.isArray(result)) {
            const firstResult = result.at(0)

            translatedContent['id'] = body.id;
            translatedContent['en-us'] = body.description;
            translatedContent[body.locale] = firstResult?.text;
        } else {
            translatedContent['id'] = body.id;
            translatedContent['en-us'] = body.description;
            translatedContent[body.locale] = result?.text;
        }

        return translatedContent
    } catch (error) {
        const locale = body.locale
        return {
            id: body.id,
            'en-us': body.description,
            locale: body.description
        }
    }
}


export default defineEventHandler(async (event) => {
    const filePath = "./translations.json"

    const body = await readBody(event)
    if (!body || !body.id || !body.description || !body.locale) {
        return {
            success: false,
            message: "Must provide: id, description, locale"
        }
    }

    const jsonData = readJsonFile<any[]>(filePath);
    if (jsonData) {
        const foundIndex = jsonData.findIndex((i) => i.id === body.id)
        if (foundIndex !== -1) {
            console.log('Entry found for ', body.id)

            if (!Object.hasOwn(jsonData[foundIndex], body.locale)) {
                const translatedContent = await translate(body)
                const finalContent = {
                    ...jsonData[foundIndex],
                    ...translatedContent
                }

                jsonData[foundIndex] = finalContent
                writeJsonFile(filePath, jsonData);
                return {
                    success: true,
                    data: finalContent
                }
            }
            return {
                success: true,
                data: jsonData[foundIndex]
            }
        }
        console.log('Entry not found, translating')

        const translatedContent = await translate(body)
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