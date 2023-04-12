import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class UpdateMessageValidatorMiddleware {
  public static updateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { message, descript, status } = req.body;
      if (!message || message.length < 4) {
        return RequestError.fieldNotProvided(res, "Message");
      }
      if (!descript || descript.length < 4) {
        return RequestError.fieldNotProvided(res, "Descript");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
