class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnAuthorizedError extends HttpError {}

// Status code 409 (Missed required data)
export class ConflictError extends HttpError {}
