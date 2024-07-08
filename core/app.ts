import { Request, Response, NextFunction } from "express";
import express, { Express } from "express";
import { createServer, Server } from "http";
import { routes } from "../routes";
import { ApiError } from "../entities/ApiError";
import cors from "cors";

const app: Express = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// allow cors for all routes
// allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.send(200);
  } else {
    //move on
    next();
  }
});

//main routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});
routes().forEach((route) => {
  route(app);
});
//end of main routes

//error handling
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(
    404,
    `Can't find ${req.originalUrl} on this server!`
  );
  next(error);
});
const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};
app.use(errorHandler);
//end of error handling

export { httpServer };
