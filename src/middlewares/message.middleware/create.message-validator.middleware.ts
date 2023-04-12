import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class CreateMessageValidatorMiddleware {
  public static createMessageValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { message, descript } = req.body;
      if (!message) {
        return RequestError.fieldNotProvided(res, "Message");
      }

      if (message.length < 4) {
        return RequestError.lengthError(
          res,
          "message must be at least 4 characters long"
        );
      }

      if (!descript) {
        return RequestError.fieldNotProvided(res, "Descript");
      }

      if (descript.length < 4) {
        return RequestError.lengthError(
          res,
          "descript must be at least 4 characters long"
        );
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
