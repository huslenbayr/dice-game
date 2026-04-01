export function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function getErrorStatusCode(error, fallback = 500) {
  if (error instanceof SyntaxError) {
    return 400;
  }

  const statusCode = Number(error?.statusCode || error?.status || fallback);
  return Number.isInteger(statusCode) && statusCode >= 400 && statusCode < 600 ? statusCode : fallback;
}
