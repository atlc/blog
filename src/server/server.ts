import * as express from 'express';
import apiRouter from './routes';
import * as morgan from 'morgan'; // Using this import syntax due to issues with typings for the exports
import * as helmet from 'helmet'; // Seen in issues like this here https://github.com/iamkun/dayjs/issues/475

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
