import {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

export class apiServer {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  public get(path: string, ...handlers: RequestHandler[]): void {
    this.app.get(path, ...handlers);
  }

  public post(path: string, ...handlers: RequestHandler[]): void {
    this.app.post(path, ...handlers);
  }

  public put(path: string, ...handlers: RequestHandler[]): void {
    this.app.put(path, ...handlers);
  }

  public delete(path: string, ...handlers: RequestHandler[]): void {
    this.app.delete(path, ...handlers);
  }
}
