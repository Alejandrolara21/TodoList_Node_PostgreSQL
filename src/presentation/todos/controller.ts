import { Request, Response } from "express";

let todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date(), completedAt:false },
    { id: 2, text: 'Buy bread', createdAt: null, completedAt:false},
    { id: 3, text: 'Buy butter', createdAt: new Date(), completedAt:false },
  ];
  

export class TodosController{

    constructor(){

    }

    public getTodos = ( req: Request, res: Response ) => {
        return res.json( todos );
    };
    
    public getTodoById = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);

        (todo)
        ? res.json(todo)
        : res.status(404).json({
            error: `TODO with Id ${id} not found`
        });
    };

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body

        if (!text) res.status(400).json({error:'Text property is required'});

        todos.push({
            id: todos.length +1,
            text,
            createdAt: new Date(),
            completedAt: false
        });

        res.json(todos);
    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error:`TODO with Id ${id} not found`});
        
        const { text, completedAt, createdAt } = req.body

        todo.text = text || todo.text;
        todo.completedAt = completedAt || todo.completedAt;
        (createdAt === 'null')
        ? todo.createdAt = null
        : todo.createdAt = new Date(createdAt || todo.createdAt);

        //! OJO, referencia
        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error:`TODO with Id ${id} not found`});

        todos = todos.filter(todoOkay => todoOkay.id !== todo.id);

        res.json(todos);
    }
}