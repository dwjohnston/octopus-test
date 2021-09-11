
// Having our own Error objects is something I generally like, as it makes
// It easier to attach information to your error 
// To enable easier debugging
export class GeneralError extends Error{
    constructor(message: string, data: unknown) {

        super(message + JSON.stringify(data)); 
    }
}