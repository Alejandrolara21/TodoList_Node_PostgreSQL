import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController{

    constructor(){

    }

    public getTodos = async ( req: Request, res: Response ) => {
        const todos = await prisma.todo.findMany();
        return res.json( todos );
    };
    
    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });
        (todo)
        ? res.json(todo)
        : res.status(404).json({
            error: `TODO with Id ${id} not found`
        });
    };

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        await prisma.todo.create({
            data: createTodoDto!
        });

        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public updateTodo = async( req: Request, res: Response ) => {
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        })

        if(error) return res.status(400).json({error});

        let todo = await prisma.todo.findFirst({
            where: {
                id: Number(id)
            }
        });
        if(!todo) return res.status(404).json({error:`TODO with Id ${id} not found`});
        
        todo = await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: updateTodoDto!.values
        })

        res.json(todo)
    }

    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        const todo = await prisma.todo.findFirst({
            where: {
                id: Number(id)
            }
        });
        if(!todo) return res.status(404).json({error:`TODO with Id ${id} not found`});


        const todoDeleted = await prisma.todo.delete({
            where:{
                id
            }
        });
        (todoDeleted)
        ? res.json(todoDeleted)
        : res.status(400).json({ error: `TODO with Id ${id} not found to delete`})
    }
}