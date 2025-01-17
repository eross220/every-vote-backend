import { Router } from "express";
import { TodoIdValidator, TodoValidator } from "../validators/todo"
import { todoController } from "../controllers/Todo";

export const todoRouter = Router();

todoRouter.get("/", todoController.getTodos);
todoRouter.post("/", TodoValidator, todoController.createTodo);
todoRouter.patch("/:id", TodoIdValidator, todoController.updateTodo);
todoRouter.delete("/:id", TodoIdValidator, todoController.deleteTodo);