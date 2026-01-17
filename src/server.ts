import app from './index';
import { startDataBase } from './config/db';

const port: number = 3000;
const hostname: string = 'http://127.0.0.1';

startDataBase().then(() => {
    app.listen(port, () => 
        console.log(`Server is running on ${hostname}:${port}`)
    );
});

