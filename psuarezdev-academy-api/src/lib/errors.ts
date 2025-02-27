export class CustomApiError extends Error {
  public statusCode: number;
  public errors: { [key: string]: any } | undefined;

  constructor(statusCode: number, message: string, errors?: { [key: string]: any }) {
    if (statusCode < 400) {
      throw new Error('Error status code must be 400 or higher');
    }

    super(message);
    this.name = 'CustomApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
