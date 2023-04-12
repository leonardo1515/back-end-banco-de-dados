import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../errors/request.error";
import { ServerError } from "../../errors/server.error";

export class LoginValidatorMiddleware {
  public static loginValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return RequestError.fieldNotProvided(res, "Email");
      }

      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
