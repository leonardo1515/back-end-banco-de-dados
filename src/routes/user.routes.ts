import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { MessagesController } from "../controllers/messages.controller";
import { ProviderIdMiddlewareValidator } from "../middlewares/user.midlleware/provider.id.middlewares";
import { CreateUserValidatorMiddleware } from "../middlewares/user.midlleware/create.user-validator.middleware";
import { LoginValidatorMiddleware } from "../middlewares/user.midlleware/login.middleware-validator.middleware";
import { UpdateUserValidatorMiddleware } from "../middlewares/user.midlleware/update-validator.medlleware";
import { CreateMessageValidatorMiddleware } from "../middlewares/message.middleware/create.message-validator.middleware";
import { UpdateMessageValidatorMiddleware } from "../middlewares/message.middleware/update-validator.medlleware";

export const userRoutes = () => {
  const app = Router();

  app.get("/", new UserController().getAll);

  app.post(
    "/login",
    LoginValidatorMiddleware.loginValidator,
    new UserController().login
  );

  app.put(
    "/:id/logoff",
    ProviderIdMiddlewareValidator.idProvider,
    new UserController().logoff
  );

  app.post(
    "/create",
    CreateUserValidatorMiddleware.createValidator,
    new UserController().create
  );

  app.put(
    "/:id/update",
    ProviderIdMiddlewareValidator.idProvider,
    UpdateUserValidatorMiddleware.updateValidator,
    new UserController().update
  );

  app.delete(
    "/:id/delete",
    ProviderIdMiddlewareValidator.idProvider,
    new UserController().delete
  );

  // messages
  app.get(
    "/:id/all/messages",
    ProviderIdMiddlewareValidator.idProvider,
    new MessagesController().listM
  );

  app.post(
    "/:id/message/create",
    ProviderIdMiddlewareValidator.idProvider,
    CreateMessageValidatorMiddleware.createMessageValidator,
    new MessagesController().create
  );

  app.put(
    "/:id/messages/update",
    ProviderIdMiddlewareValidator.idProvider,
    UpdateMessageValidatorMiddleware.updateValidator,
    new MessagesController().update
  );

  app.put(
    "/:id/messages/save",
    ProviderIdMiddlewareValidator.idProvider,
    new MessagesController().save
  );

  app.delete(
    "/:id/messages/delete",
    ProviderIdMiddlewareValidator.idProvider,
    new MessagesController().delete
  );

  return app;
};
