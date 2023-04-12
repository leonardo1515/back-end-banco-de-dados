import { Request, Response } from "express";
import { Messages } from "../models/messages.models";
import { UserDatabase } from "../database/repositories/user.database";
import { ServerError } from "../errors/server.error";
import { SuccessResponse } from "../util/success.response";
import { MessagesDatabase } from "../database/repositories/messages.database";
import { RequestError } from "../errors/request.error";

export class MessagesController {
  public async listM(req: Request, res: Response) {
    try {
      const database = new MessagesDatabase();
      const message = await database.listMessage();
      return SuccessResponse.ok(res, "Message successfull obtianed", message);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { message, descript, status } = req.body;
      const database = new MessagesDatabase();
      const result = await database.create(
        id,
        new Messages(message, descript, status)
      );

      return SuccessResponse.created(
        res,
        "New message successfully created",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { message, descript, status } = req.body;
      const database = new MessagesDatabase();
      const result = await database.update(id, message, descript, status);

      if (result === 0 || result === null) {
        return RequestError.notFound(res, "User");
      }

      return SuccessResponse.created(
        res,
        "Message successfully updated",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async save(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const database = new MessagesDatabase();
      const result = await database.save(id, status);

      if (result === null) {
        return RequestError.notFound(res, "message");
      }

      return SuccessResponse.created(
        res,
        "Message successfully updated",
        status
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new MessagesDatabase();
      const result = await database.delete(id);

      if (result === 0 || result === null) {
        return RequestError.notFound(res, "User");
      }

      return SuccessResponse.delete(
        res,
        "Message successfully deleted",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
