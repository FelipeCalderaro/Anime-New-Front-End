import type { MediaFormat, MediaStatus } from "#gql/default";

export enum All {
    ALL,
    OTHER,
}

export type Format = All | MediaFormat;


export type Status = All | MediaStatus;