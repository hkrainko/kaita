export abstract class RegisterError extends Error {
  constructor() {
    super();
  }
}

export class RegisterErrorUnknown extends RegisterError{}
export class RegisterErrorDuplicated extends RegisterError{}
export class RegisterErrorAuthIDAlreadyRegister extends RegisterError {}
