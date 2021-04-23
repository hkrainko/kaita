export abstract class GetUserError extends Error {
  constructor() {
    super();
  }
}

export class GetUserErrorUnknown extends GetUserError {

}

export class GetUserErrorNotFound extends GetUserError {

}

export class GetUserErrorUnAuth extends GetUserError {

}
