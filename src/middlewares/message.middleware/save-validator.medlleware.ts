import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class SaveMessageValidatorMiddleware {
  public static updateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status } = req.body;
      if (!status) {
        return RequestError.fieldNotProvided(res, "Status");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
