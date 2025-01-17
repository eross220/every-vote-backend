import { AppDataSouce } from "../db";
import { TodoEntity } from '../entities';



export const getTodos = async (userId: string) => {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);
    return await todoRepository.find({ where: { userId } });
};

export const createTodo = async (data: Partial<TodoEntity> & { userId: string }) => {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);
    const todo = todoRepository.create(data);
    return await todoRepository.save(todo);
};

export const updateTodo = async (id: string, userId: string, data: Partial<TodoEntity>) => {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);

    const todo = await todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
    return null; // If the todo doesn't belong to the user, return null
    }
    await todoRepository.update(id, data); // Update the todo
    return await todoRepository.findOne({ where: { id } }); // Return updated todo
};

export const deleteTodo = async (id: string, userId: string) => {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);
    const todo = await todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
    return null; // If the todo doesn't belong to the user, return null
    }

    await todoRepository.delete(id); // Delete the todo
    return id; // Return the deleted todo ID
};
