import app from './index';

const port: number = 3000;
const hostname: string = 'http://127.0.0.1';

app.listen(port, () => {
    console.log(`Server is running on ${hostname}:${port}`);
});
