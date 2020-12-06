import DB from '../db';
import * as express from 'express';
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params?.id;
        const blogtags = await DB.BlogTags.get.from_blog(id);
        res.status(200).send(blogtags);
    } catch (e) {
        console.log(e);
        res.status(500).send('A server error has occurred. Please check the server logs for more info.');
    }
});

export default router;