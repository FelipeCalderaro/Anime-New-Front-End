export async function translate(id: number, description: string) {
    try {
        const response = await fetch(
            `/temporadas/api/translate`, // Ensure the correct URL
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    description: description,
                }),
            }
        );

        if (!response.ok)
            throw new Error(`Translation request for ID ${id} failed`);

        const result: {
            success: boolean,
            data: {
                id: number;
                description: string;
                translation: string;
            }
        } = await response.json();
        // console.log(`Translated data for ID ${id}:`, result);

        return result;

    } catch (error) {
        console.error(`Translation Error for ID ${id}:`, error);
        return null;
    }
}