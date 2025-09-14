export function applyTailwindClassById(id: string, className: string, breakpoints: number): void {
    const element = document.getElementById(id);
    if (!element) return;

    // Clear previously applied responsive classes
    element.classList.remove(className);

    // Tailwind breakpoints
    const lg = window.matchMedia('(min-width: 1024px)');
    const md = window.matchMedia('(min-width: 768px)');

    if (lg.matches) {
        element.classList.add('flex'); // Apply 'flex' on large screens and above
    } else if (md.matches) {
        element.classList.add('block'); // Apply 'block' on medium screens
    } else {
        element.classList.add('hidden'); // Hide on small screens
    }
}
