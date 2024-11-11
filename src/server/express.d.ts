import * as express from 'express';
import { User } from './domain';
import { LibraryService } from './library_service';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      libraryService?: LibraryService;
    }
  }
}