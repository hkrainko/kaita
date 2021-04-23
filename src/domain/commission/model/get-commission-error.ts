

export abstract class GetCommissionError extends Error {
  constructor() {
    super();
  }
}

export class GetCommissionErrorUnknown extends GetCommissionError{

}
