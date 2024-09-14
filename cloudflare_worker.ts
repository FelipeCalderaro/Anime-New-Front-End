// async function handleRequest(request) {
//     const url = new URL(request.url);

//     // Check if the path matches /season
//     if (url.pathname.includes('/season')) {
//         // Replace with the actual Netlify URL
//         const targetURL = `https://your-netlify-site.netlify.app${url.pathname.replace('/season', '')}`;

//         // Fetch the response from the Netlify site
//         const response = await fetch(targetURL, {
//             method: request.method,
//             headers: request.headers,
//             body: request.body
//         });

//         // Return the response while keeping the original URL
//         return response;
//     }

//     // If not /season, return the original request
//     return fetch(request);
// }

// addEventListener('fetch', event => {
//     event.respondWith(handleRequest(event.request));
// });
