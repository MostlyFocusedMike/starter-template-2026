import { auth, type Session } from "../../auth";

declare module 'express-serve-static-core' {
  export interface Request {
    session?: Session | null;
  }
}
