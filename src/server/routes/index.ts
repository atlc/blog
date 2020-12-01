import * as express from 'express';
import blogRouter from './blogs';
import authorRouter from './authors';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/authors', authorRouter);

router.get('*', (req, res, next) => {
    res.status(404).json('That is not a valid API endpoint');
});


export default router;