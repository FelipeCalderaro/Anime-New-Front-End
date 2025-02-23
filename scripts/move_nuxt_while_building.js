import { promises as fs } from 'fs';
import path from 'path';

const baseURL = process.env.NUXT_APP_BASE_URL;

if (!baseURL) {
    throw new Error('NUXT_APP_BASE_URL is not defined');
}

const source = 'dist';
const nuxtSource = path.join(source, '_nuxt');
const destination = path.join(source, baseURL, '_nuxt');

async function moveBuild() {
    try {
        // Ensure the source _nuxt directory exists
        const nuxtExists = await fs.stat(nuxtSource).then(() => true).catch(() => false);
        if (!nuxtExists) {
            throw new Error(`Source directory ${nuxtSource} does not exist`);
        }

        // Ensure the destination directory exists
        await fs.mkdir(path.join(source, baseURL), { recursive: true });

        // Move the _nuxt directory
        await fs.rename(nuxtSource, destination);

        console.log(`Moved _nuxt from ${nuxtSource} to ${destination}`);
    } catch (error) {
        console.error('Error moving build:', error);
        process.exit(1);
    }
}

moveBuild();
