export class ValidationException extends Error {
    constructor(errorMessage: string) {
      super(errorMessage);
  
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, ValidationException.prototype);
    }
  }