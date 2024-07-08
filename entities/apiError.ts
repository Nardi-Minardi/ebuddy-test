export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly message: string;
  public readonly isOperational: boolean;

  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
}


export class ErrorResponseBody {
  constructor(
    public error: {
      statusCode: HttpStatusCode;
      message: string;
    }
  ) {}
}
