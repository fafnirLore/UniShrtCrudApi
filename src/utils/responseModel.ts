export class ResponseModel {
  constructor(
    public message: string,
    public statusCode: number,
    public documentation: string,
    public data: any[],
    public timeStamp?: string,
  ) {}
}
