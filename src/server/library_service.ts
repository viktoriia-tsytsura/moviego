import { Collection, Db } from "mongodb";
import { Movie, User } from "./domain";

export interface LibraryService {
    listWatched(): Promise<Movie[]>;
    listQueued(): Promise<Movie[]>;

    addToWatched(movie: Movie): Promise<Movie[]>;
    addToQueueed(movie: Movie): Promise<Movie[]>;

    removeFromWatched(movieId: Movie['id']): Promise<Movie[]>;
    removeFromQueued(movieId: Movie['id']): Promise<Movie[]>;
}

type DbMovie = Movie & {
    userId: string;
    collectionType: 'watched' | 'queued';
};

class LibraryServiceImpl implements LibraryService {
    private moviesCollection: Collection<DbMovie>;

    constructor(
        private readonly db: Db,
        private readonly user: User,
    ) {
        this.moviesCollection = db.collection<DbMovie>('movies');
    }

    async listWatched(): Promise<Movie[]> {
        return this.listMovies('watched');
    }

    async listQueued(): Promise<Movie[]> {
        return this.listMovies('queued');
    }

    async addToWatched(movie: Movie): Promise<Movie[]> {
        await this.addToLibrary(movie, 'watched');
        return this.listMovies('watched');
    }

    async addToQueueed(movie: Movie): Promise<Movie[]> {
        await this.addToLibrary(movie, 'queued');
        return this.listMovies('queued');
    }

    async removeFromWatched(movieId: Movie["id"]): Promise<Movie[]> {
        await this.removeFromLibrary(movieId, 'watched');
        return this.listMovies('watched');
    }

    async removeFromQueued(movieId: Movie["id"]): Promise<Movie[]> {
        await this.removeFromLibrary(movieId, 'queued');
        return this.listMovies('queued');
    }

    private async listMovies(collectionType: DbMovie['collectionType']): Promise<Movie[]> {
        const movies = await this.moviesCollection.find({
            userId: this.user.id,
            collectionType,
        }).toArray();

        return movies.map(LibraryServiceImpl.dbToDomainMovie);
    }

    private async addToLibrary(movie: Movie, collectionType: DbMovie['collectionType']) {
        await this.moviesCollection.insertOne(this.domainToDbMovie(collectionType)(movie));
    }

    private async removeFromLibrary(movieId: Movie['id'], collectionType: DbMovie['collectionType']) {
        await this.moviesCollection.deleteOne({
            id: movieId,
            userId: this.user.id,
            collectionType,
        });
    }

    private domainToDbMovie(collectionType: DbMovie['collectionType']): (dmnMovie: Movie) => DbMovie {
        return (dmnMovie: Movie) => ({
            ...dmnMovie,
            userId: this.user.id,
            collectionType,
        });
    }

    private static dbToDomainMovie({ userId, collectionType, ...rest }: DbMovie): Movie {
        return rest;
    }
}

export function createLibraryService(db: Db, user: User) {
    return new LibraryServiceImpl(db, user);
}
