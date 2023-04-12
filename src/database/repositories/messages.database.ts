import { Messages } from "../../models/messages.models";
import { DatabaseConnection } from "../config/database.connection";
import { MessageEntity } from "../entities/message.entity";
import { users } from "../user";

export class MessagesDatabase {
  private repository =
    DatabaseConnection.connection.getRepository(MessageEntity);

  public static mapEntityToModel(entity: MessageEntity): Messages {
    return Messages.create(
      entity.id,
      entity.message,
      entity.descript,
      entity.status
    );
  }

  public async create(id: string, message: Messages) {
    const messageEntity = this.repository.create({
      id: message.id,
      message: message.message,
      descript: message.descript,
      status: false,
      idUser: id,
    });

    const result = await this.repository.save(messageEntity);
    return MessagesDatabase.mapEntityToModel(result);
  }

  public async update(
    id: string,
    message: string,
    descript: string,
    status: boolean
  ): Promise<number> {
    const result = await this.repository.update(
      {
        id,
      },
      {
        message,
        descript,
        status,
        atUpdate: new Date(),
      }
    );

    return result.affected ?? 0;
  }

  public async delete(id: string): Promise<number> {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async save(id: string, status: boolean) {
    const result = await this.repository.update(
      {
        id,
      },
      {
        status,
        atUpdate: new Date(),
      }
    );

    return result.affected ?? 0;
  }

  public async listMessage() {
    const result = await this.repository.find({
      relations: ["user"],
    });

    return result.map((item) => MessagesDatabase.mapEntityToModel(item));
  }

  public getOneMessag(idUser: string, idMessage: string) {
    const user = users.find((curret) => curret.id === idUser);
    return user?.message?.find((message) => message.id === idMessage);
  }
}
