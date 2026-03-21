import { RequestHandler } from "express";

export const isAdmin: RequestHandler = async (req, res, next) => {
  if (!req.session) return res.sendStatus(403);
  next();
};
