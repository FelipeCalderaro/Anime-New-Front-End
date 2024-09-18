export function zip(...arrays: any[]) {
    const minLength = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
}


export function constructLocalePath(path: string, id?: number | null, slug?: string | null): string {
    const localePath = useLocalePath();
    let fullPath = path;
    if (!path.includes('/')) {
        fullPath = '/' + path;

    }
    if (id !== null && id !== undefined) {
        fullPath += `/${id}`;
    }
    if (slug !== null && slug !== undefined) {
        fullPath += `/${slugify(slug)}`;
    }
    return localePath(fullPath);
}


function toggleSpoiler(spoilerElement: HTMLElement, button: HTMLElement) {
    const spoilerContent = spoilerElement.querySelector("span");
    if (spoilerContent) {
        // Toggle visibility of the spoiler content
        const isHidden = spoilerContent.style.display === "none";
        spoilerContent.style.display = isHidden ? "inline" : "none";
        button.textContent = isHidden ? "Hide Spoiler" : "Show Spoiler";
    }
}

export function onMountToggleSpoiler() {
    // Find all elements with the 'markdown_spoiler' class after the HTML has been rendered
    const contentElements = document.querySelectorAll(".markdown_spoiler");

    contentElements.forEach((el: Element) => {
        const spoilerElement = el as HTMLElement;
        const spoilerContent = spoilerElement.querySelector("span");

        if (spoilerContent) {
            // Initially hide the spoiler content
            spoilerContent.style.display = "none";

            // Create a button for toggling the spoiler
            const toggleButton = document.createElement("button");
            toggleButton.textContent = "Show Spoiler\t"; // Initial button text
            toggleButton.classList.add("spoiler-toggle-button");

            // const textBreak = document.createElement("br");

            // Insert the button before the spoiler content
            spoilerElement.insertBefore(toggleButton, spoilerContent);
            // spoilerElement.insertBefore(textBreak, spoilerContent);

            // Add click event listener to toggle visibility
            toggleButton.addEventListener("click", () =>
                toggleSpoiler(spoilerElement, toggleButton)
            );
        }
    });
}