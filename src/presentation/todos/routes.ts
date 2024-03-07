import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryPosgres } from "../../infrastructure/repositories/todo.repository.postgres";

export class TodoRoutes{
    static get routes(): Router {
        const router = Router();
        
        const dataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryPosgres(dataSource);
        const todoController = new TodosController(todoRepository);



        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getTodoById );
        router.post('/', todoController.createTodo);
        router.put('/:id',todoController.updateTodo);
        router.delete('/:id',todoController.deleteTodo);
        return router;
    }
}