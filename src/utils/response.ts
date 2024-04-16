export class CustomResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: string,
    public data?: any
  ) {
    this.statusCode = statusCode || 200;
    this.message = message || "";
    this.data = data;
  }
}
