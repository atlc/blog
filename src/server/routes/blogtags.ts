import DB from '../db';
import * as express from 'express';
const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    try {
        const id = req.params?.id;
        const blogtags = (!!id) ? await DB.BlogTags.get.from_blog(id) : await DB.BlogTags.get.all();
        res.status(200).send(blogtags);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const blogtags_array = req.body.blogtags_array;
        const blogtags = await DB.BlogTags.do.create_new(blogtags_array);
        res.status(200).send(blogtags);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

export default router;