import * as express from 'express';
import apiRouter from './routes';
import * as morgan from 'morgan'; // Using this import syntax due to issues with typings for the exports
import * as helmet from 'helmet'; // Seen in issues like this here https://github.com/iamkun/dayjs/issues/475
import path from 'path';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', apiRouter);

/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
*/


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
