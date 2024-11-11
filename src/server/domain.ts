export type User = {
    id: string;
    name: string;
};

export type Session = {
    id: string;
    userId: string;
    userName: string;
    dateCreated: number;
    token: string;
};

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: number[];
};

export class ApplicationError extends Error {
    code = 400;
}
export class AuthenticationError extends Error {
    code: 401;
}