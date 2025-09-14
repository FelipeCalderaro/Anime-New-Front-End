export const useImageCache = (key: string, imageUrls: string[]) => {
    const cachedImages = useState<string[]>(key, () => []);

    // If images are not cached, fetch them
    if (cachedImages.value.length === 0 && imageUrls.length > 0) {
        Promise.all(
            imageUrls.map(async (url) => {
                if (!url) return "";
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return URL.createObjectURL(blob); // Convert to Blob URL
                } catch (error) {
                    console.error(`Failed to load image: ${url}`, error);
                    return "";
                }
            })
        ).then((blobs) => {
            cachedImages.value = blobs.filter((blob) => blob); // Remove empty URLs
        });
    }

    return cachedImages;
};
