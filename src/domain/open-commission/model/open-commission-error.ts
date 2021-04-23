export abstract class OpenCommissionError extends Error {
    constructor() {
        super();
    }
}

export class OpenCommissionErrorUnknown extends OpenCommissionError {
}

export class OpenCommissionErrorUnAuth extends OpenCommissionError {
}

