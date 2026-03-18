import { RequestHandler } from "express";

export const logRoutes: RequestHandler = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${time} - ${req.method}: ${req.originalUrl}`);
  next();
};