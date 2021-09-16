/* eslint-disable max-classes-per-file */

class AppException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppException.prototype);
  }
}

export class UserNotFoundException extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}
