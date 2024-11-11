import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ApplicationError, AuthenticationError, User } from './domain';
import { AuthorizationService } from './authorization_service';
import { LibraryService } from './library_service';

export type RuntimeServices = {
    libraryService: LibraryService;
};

export function createErrorInterceptor(): ErrorRequestHandler {
    return (error, req, res) => {
        if (error instanceof ApplicationError || error instanceof AuthenticationError) {
            res.status(error.code).send(error.message);
        } else {
            res.status(500).send(error.message);            
        }
    };
}

export function createAuthorizationMiddleware(
    authorizationService: AuthorizationService,
    createRuntimeServices: (user: User) => RuntimeServices,
): RequestHandler {
    return (req, res, next) => {
        const token = req.cookies.authToken;

        const user = authorizationService.validate(token);
        req.user = user;
        req.libraryService = createRuntimeServices(user).libraryService;
        next();
    };
}