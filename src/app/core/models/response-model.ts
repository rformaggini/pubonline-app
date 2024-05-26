export class ResponseModel<T = null> {
    message!: string;
    code!: string;
    hasError!: false;
    data!: T;
}