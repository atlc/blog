import * as express from 'express';
import blogRouter from './blogs';
import authorRouter from './authors';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/authors', authorRouter);

router.get('*', (req, res, next) => {
    res.json('API Root dawgs, whazzup');
});


export default router;