import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryPosgres implements TodoRepository{

    constructor(
        private readonly dataSource: TodoDataSource
    ){}
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id);
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.updateById(updateTodoDto);
    }
    delete(id: number): Promise<TodoEntity> {
        return this.dataSource.delete(id);
    }

}