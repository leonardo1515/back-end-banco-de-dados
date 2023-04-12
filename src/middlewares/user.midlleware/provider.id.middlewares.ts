import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class ProviderIdMiddlewareValidator {
  public static idProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return RequestError.fieldNotProvided(res, "Id");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
