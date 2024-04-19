import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "stream/consumers";

describe("Todo routes testing", () => {

    beforeAll(async() => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close();
    });

    beforeEach(async() => {
        await prisma.todo.deleteMany();
    });

    const todo1 = {
        text: "Hola mundo 1",
        completedAt: false,
    }
    const todo2 = {
        text: "Hola mundo 2",
        completedAt: false,
    }

    test('Should return TODOs "api/todos"', async () => {
        
        await prisma.todo.createMany({
            data: [todo1,todo2]
        });

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        
    });

    test('Should return any todo by id', async() => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const {body} = await request(testServer.app)
        .get(`/api/todos/${todo.id}`)
        .expect(200);

        expect(body).toEqual({
            id: todo.id, 
            text: 'Hola mundo 1', 
            completedAt: false, 
            createdAt: null
        });
        // expect(body)

    });

    test('Should return a 404 NotFound in todo by id', async() => {
        const idTodo = 9999;
        const {body} = await request(testServer.app)
        .get(`/api/todos/${idTodo}`)
        .expect(404);

        expect(body).toEqual({ error: `TODO with Id ${idTodo} not found` });
    });

    test('Should return a new Todo', async() => {
        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: todo1.completedAt,
            createdAt: expect.any(String)
        });
    });

    test('Should return error if text is not present when create new Todo', async() => {
        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400)

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('Should return error if text is not empty when create new Todo', async() => {
        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send({text:''})
            .expect(400)

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('Should return update todo', async() => {
        const todo = await prisma.todo.create({data: todo1});

        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({
                text:'Hola Mundo UPDATE',
                createdAt: '2023-10-21',
                completedAt: "true"
            })
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: 'Hola Mundo UPDATE',
            completedAt: true,
            createdAt: '2023-10-21T00:00:00.000Z'
        });
    });

    // TODO: DO operation with custom errors
    test('Should return error if TODO not found', async() => {

        const idTodoTest = 99999;
        const {body} = await request(testServer.app)
            .put(`/api/todos/${idTodoTest}`)
            .send({
                text:'Hola Mundo UPDATE',
                createdAt: '2023-10-21',
                completedAt: "true"
            })
            .expect(404)

        expect(body).toEqual({ error: `TODO with Id ${idTodoTest} not found` });
    });

    test('Should return an updated TODO only date param', async() => {
        const todo = await prisma.todo.create({data: todo1});
        const dateTodoTest = '2023-10-21';
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({
                createdAt: dateTodoTest,
            })
            .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt,
            createdAt: `${dateTodoTest}T00:00:00.000Z`
        });
    });

    test('Should delete TODO by Id', async() => {
        const todo = await prisma.todo.create({data: todo1});
        
        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .send()
            .expect(200)

        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: expect.any(String), 
            completedAt: expect.any(Boolean), 
            createdAt: null 
        });
    });

    // TODO: DO operation with custom errors
    test('Should return error if TODO not found', async() => {

        const idTodoTest = 99999;
        const {body} = await request(testServer.app)
            .delete(`/api/todos/${idTodoTest}`)
            .send()
            .expect(404)

        expect(body).toEqual({ error: `TODO with Id ${idTodoTest} not found` });
    });
})