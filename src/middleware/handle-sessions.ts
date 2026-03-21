import { fromNodeHeaders } from "better-auth/node";
import { RequestHandler } from "express";
import { auth } from "../auth";

export const handleSessions: RequestHandler = async (req, res, next) => {
  const headers = fromNodeHeaders(req.headers);
  const session = (await auth.api.getSession({ headers }));
  req.session = session
  next();
};
