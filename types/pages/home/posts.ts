export type Posts = {
    data: Datum[];
    meta: Meta;
}

export type Datum = {
    id: number;
    attributes: DatumAttributes;
}

export type DatumAttributes = {
    Title: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    Slug: string;
    Highlight: boolean;
    Subtitle: null | string;
    uuid: string;
    PostColors: null | string;
    CommentsConfiguration: null;
    Content: string;
    Banner: Banner;
}

export type Banner = {
    data: Data;
}

export type Data = {
    id: number;
    attributes: DataAttributes;
}

export type DataAttributes = {
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: Date;
    updatedAt: Date;
}

export type Formats = {
    thumbnail: Large;
    large: Large;
    medium: Large;
    small: Large;
}

export type Large = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export type Meta = {
    pagination: Pagination;
}

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
