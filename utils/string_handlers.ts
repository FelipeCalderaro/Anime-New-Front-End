import { APP_CONFIGS } from "~/constants";

export const slugify = (...args: string[]): string => {
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}


export function constructSEOTitle(content?: string | null): string {
    if (content === null || content === undefined) return APP_CONFIGS.title;
    return `${APP_CONFIGS.name} - ${content}`;
}

export function removeHtmlTags(input?: string | null): string {
    if (input === null || input === undefined) return '';
    return input.replace(/<[^>]*>/g, '');
}