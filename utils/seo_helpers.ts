export interface ConstructHead {
    title?: string | null,
    description?: string | null,
    ogImage?: string | null,
    ogUrl: string

}

export function constructHead(data: ConstructHead) {
    return {
        title: constructSEOTitle(
            data.title
        ),
        meta: [
            {
                name: "description",
                content: removeHtmlTags(data.description),
            },
            {
                property: "og:description",
                content: removeHtmlTags(data.description),
            },
            {
                property: "og:title",
                content: data.title,
            },
            {
                property: "og:image",
                content: data.ogImage
            },
            {
                property: "og:url",
                content: data.ogUrl,
            },
            {
                property: "twitter:title",
                content: data.title,
            },
            {
                property: "twitter:description",
                content: removeHtmlTags(data.description),
            },
            {
                property: "twitter:image",
                content: data.ogImage,
            },
            {
                property: "twitter:card",
                content: 'summary',
            },
        ],
        htmlAttrs: {
            lang: 'en'
        },
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon.png'
            }
        ]
    }
}