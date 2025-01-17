import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/generate"; // Assuming the function is in utils/generate

const getTodosHandler = async (req, res) => {
  const token = req.headers.authorization; // JWT token from the Authorization header
  
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is required" });
  }

  const userId = verifyToken(token); // Decode and get user_id
  console.log("userid:",userId)

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }

  // Pass userId to the service to fetch todos for the specific user
  const todos = await todoService.getTodos(userId);
  console.log("all todos:", todos)
  res.json(todos).status(httpStatus.OK);
};

const createTodoHandler = async (req, res) => {
  const token = req.headers.authorization; // JWT token from the Authorization header
  
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is required" });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
  console.log(req.body)
  const todoData = { ...req.body, userId };
  const createdTodo = await todoService.createTodo(todoData);
  res.json(createdTodo).status(httpStatus.CREATED);
};

const updateTodoHandler = async (req, res) => {
  const { id } = req.params;
  const todoData = req.body;
  const token = req.headers.authorization; // JWT token from the Authorization header
  
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is required" });
  }

  const userId = verifyToken(token); // Decode and get user_id

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }

  const updatedTodo = await todoService.updateTodo(id, userId, todoData); // Pass userId for the update check
  if (!updatedTodo) {
    res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
    return;
  }
  res.json(updatedTodo).status(httpStatus.OK);
};

const deleteTodoHandler = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization; // JWT token from the Authorization header
  
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is required" });
  }

  const userId = verifyToken(token); // Decode and get user_id

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }

  const deletedId = await todoService.deleteTodo(id, userId); // Pass userId for delete authorization
  if (!deletedId) {
    res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
    return;
  }
  res.status(httpStatus.NO_CONTENT).send();
};

export const todoController = {
  getTodos: errorHandlerWrapper(getTodosHandler),
  createTodo: errorHandlerWrapper(createTodoHandler),
  updateTodo: errorHandlerWrapper(updateTodoHandler),
  deleteTodo: errorHandlerWrapper(deleteTodoHandler),
};
