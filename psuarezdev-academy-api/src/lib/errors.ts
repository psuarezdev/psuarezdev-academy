export class CustomApiError extends Error {
  public statusCode: number;
  public errors: { [key: string]: any } | undefined;

  constructor(statusCode: number, message: string, errors?: { [key: string]: any }) {
    super(message);
    this.name = 'CustomApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
