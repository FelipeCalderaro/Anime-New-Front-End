export function zip(...arrays: any[]) {
    const minLength = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
}

export function createLocalePath(path: string, id?: number | null, slug?: string | null) {
    const localePath = useLocalePath()
    let fullPath = path
    if (!fullPath.includes('/')) {
        fullPath = '/' + fullPath;
    }
    if (id !== null && id !== undefined) {
        fullPath += `/${id}`;
    }
    if (slug !== null && slug !== undefined) {
        fullPath += `/${slugify(slug!)}`
    }
    return localePath(fullPath);
}