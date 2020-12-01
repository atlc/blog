import DB from '../db';
import * as express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let blogs = await DB.Blogs.get.all();
        res.json(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send('Uh oh, we made a fucky wucky :(');
    }
});

export default router;
