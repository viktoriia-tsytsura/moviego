import { Collection, Db, MongoAPIError } from 'mongodb';
import md5 from 'md5';
import { v4 as uuid } from 'uuid';
import { sign, verify } from 'jsonwebtoken';

import { ApplicationError, AuthenticationError, Session, User } from './domain';

export type RegisterPayload = {
    name: string;
    password: string;
};

export type AuthenticatePayload = {
    name: string;
    password: string;
};

export interface AuthorizationService {
    register(payload: RegisterPayload): Promise<void>;
    authenticate(payload: AuthenticatePayload): Promise<string>;
    validate(token: string): User;
}

type JWTPayload = {
    iat: number;
    sub: string;
    userName: string;
};

type DbUser = User & {
    passwordHash: string;
}

class AuthorizationServiceImpl implements AuthorizationService {
    private usersCollection: Collection<DbUser>;
    private sessionsCollection: Collection<Session>;

    constructor(
        private readonly db: Db,
        private readonly secret: string,
    ) {
        this.usersCollection = db.collection<DbUser>('users');
        this.sessionsCollection = db.collection<Session>('sessions');
    }

    async register(payload: RegisterPayload): Promise<void> {
        try {
            const id = uuid();
            const pwdHash = md5(payload.password);

            await this.usersCollection.insertOne({
                id,
                name: payload.name,
                passwordHash: pwdHash,
            });
        } catch (error) {
            if (error instanceof MongoAPIError && error.code === 11000) {
                throw new ApplicationError(`The user with the name ${payload.name} already exists.`);
            }

            throw error;
        }
    }

    async authenticate(payload: AuthenticatePayload): Promise<string> {
        const user = await this.usersCollection.findOne({ name: payload.name });

        if (!user) {
            throw new ApplicationError(`No user with name "${payload.name}" exists.`);
        }

        const pwdHash = md5(payload.password);
        
        if (pwdHash !== user.passwordHash) {
            throw new ApplicationError('Incorrect password.');
        }

        const sessionId = uuid();
        const iat = Date.now();
        const token = sign(
            { iat, sub: user.id, userName: user.name, sessionId } as JWTPayload,
            this.secret,
            { expiresIn: '1h' },
        );

        await this.sessionsCollection.insertOne({
            id: sessionId,
            userId: user.id,
            userName: user.name,
            token,
            dateCreated: iat,
        });

        return token;
    }

    validate(token: string): User {
        try {
            const data = verify(token, this.secret) as JWTPayload;

            return {
                id: data.sub,
                name: data.userName,
            };
        } catch (err) {
            console.error(err);
            throw new AuthenticationError('Authenctication failed.');
        }
    }
}

export function createAuthorizationService(db: Db, signerSecret: string): AuthorizationService {
    return new AuthorizationServiceImpl(db, signerSecret);
}