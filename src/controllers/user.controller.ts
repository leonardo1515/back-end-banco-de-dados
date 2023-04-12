import { Request, Response } from "express";
import { User } from "../models/user.models";
import { UserDatabase } from "../database/repositories/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { SuccessResponse } from "../util/success.response";

export class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const database = new UserDatabase();

      if (!email) {
        return RequestError.fieldNotProvided(res, "Email");
      }
      const allUsers = await database.listEntity(email);

      return SuccessResponse.ok(res, "User successfull obtianed", allUsers);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password, status } = req.body;
      const database = new UserDatabase();
      const user = await database.login(email, password);

      if (!user?.id || user === null) {
        return RequestError.notFound(res, "User");
      }
      const save = await database.save(user.id, status);
      user.status = true;

      return SuccessResponse.ok(
        res,
        "User successfull obtianed",
        user.toJson()
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async logoff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const database = new UserDatabase();
      const user = await database.logoff(id, status);

      if (user === null || user === 0) {
        return RequestError.notFound(res, "User");
      }

      return SuccessResponse.ok(res, "Successfully edited usuario", status);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, id, password, status } = req.body;
      const database = new UserDatabase();
      const getEmail = await database.byEmail(email);

      if (getEmail === null || getEmail === undefined) {
        const newUser = await database.create(
          new User(name, email, password, status, id)
        );

        return SuccessResponse.created(
          res,
          "New user successfully created",
          newUser
        );
      }
      return RequestError.alreadyExisting(res, "this email is being used");
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      const database = new UserDatabase();
      const user = await database.update(id, name, password);

      if (user === 0 || user === null) {
        return RequestError.notFound(res, "User");
      }

      return SuccessResponse.created(res, "User successfully updated", user);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new UserDatabase();
      const result = await database.delete(id);

      if (result === 0 || result === null) {
        return RequestError.notFound(res, "User");
      }
      return SuccessResponse.ok(res, "User successfully deleted", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
