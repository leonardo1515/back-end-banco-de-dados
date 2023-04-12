import { Response } from "express";

export class SuccessResponse {
  public static ok(res: Response, message: string, data: any) {
    return res.status(200).send({
      ok: true,
      message,
      data,
    });
  }

  public static created(res: Response, message: string, data: any) {
    return res.status(201).send({
      ok: true,
      message,
      data,
    });
  }

  public static delete(res: Response, message: string, data: any) {
    return res.status(200).send({
      ok: true,
      message,
      data,
    });
  }

  public static filter(res: Response, data: any) {
    return res.status(200).send({
      ok: true,
      data,
    });
  }
}
