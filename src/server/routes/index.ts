import * as express from 'express';
import blogRouter from './blogs';
import authorRouter from './authors';
import blogtagRouter from './blogtags';
import tagsRouter from './tags';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/authors', authorRouter);
router.use('/blogtags', blogtagRouter);
router.use('/tags', tagsRouter);

router.get('*', (req, res, next) => {
    res.status(404).json('That is not a valid API endpoint');
});


export default router;