export default {
    projects: {
        anilist: {
            schema: ['./queries/anilist_schema.graphql', 'directives.graphql'],
            documents: ['**/*.{graphql,js,ts,jsx,tsx}', 'my/fragments.graphql'],
        },
    },
};