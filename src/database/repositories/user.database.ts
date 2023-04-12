import { User } from "../../models/user.models";
import { DatabaseConnection } from "../config/database.connection";
import { MessagesDatabase } from "./messages.database";
import { UserEntity } from "../entities/user.entity";
import { users } from "../user";

export class UserDatabase {
  private repository = DatabaseConnection.connection.getRepository(UserEntity);

  private mapEntityToModel(entity: UserEntity): User {
    const userEntity = entity.message ?? [];
    const message = userEntity.map((item) =>
      MessagesDatabase.mapEntityToModel(item)
    );

    return User.create(
      entity.name.trim(),
      entity.email,
      entity.password,
      entity.status,
      entity.id.trim(),
      message
    );
  }

  public async byEmail(email: string): Promise<User | null> {
    const result = await this.repository.findOneBy({
      email,
    });

    if (result === null) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(user: User) {
    const userEntily = this.repository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      status: false,
      id: user.id,
    });

    const result = await this.repository.save(userEntily);
    return this.mapEntityToModel(result);
  }

  public async listEntity(email: string): Promise<User[]> {
    const result = await this.repository.find({
      relations: ["message"],
    });

    return result.map((user) => this.mapEntityToModel(user));
  }

  public async login(email: string, password: string): Promise<User | null> {
    const result = await this.repository.findOne({
      where: { email, password },
      relations: ["message"],
    });

    if (result === null) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async save(id: string, status: boolean) {
    const result = await this.repository.update(
      {
        id,
      },
      {
        status,
      }
    );

    return result.affected ?? 0;
  }

  public async logoff(id: string, status: boolean) {
    const result = await this.repository.update(
      {
        id,
      },
      {
        status,
        // atUpdate: new Date(),
      }
    );
    return result.affected ?? 0;
  }

  public async delete(id: string) {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async update(
    id: string,
    name: string,
    password: string
  ): Promise<number> {
    const result = await this.repository.update(
      {
        id,
      },
      {
        name,
        password,
        atUpdate: new Date(),
      }
    );
    return result.affected ?? 0;
  }
}
