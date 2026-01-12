import express, { Application, Request, Response } from 'express';

const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!').status(200);
});

export default app;
