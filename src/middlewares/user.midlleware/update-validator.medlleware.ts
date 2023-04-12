import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class UpdateUserValidatorMiddleware {
  public static updateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, password } = req.body;

      if (!name && !password) {
        return RequestError.fieldNotProvided(res, "Name and password");
      }

      if (password.length < 4) {
        return RequestError.lengthError(
          res,
          "password must be at least 4 characters long"
        );
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
