import DB from '../db';
import e, * as express from 'express';
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


// Creating what should be a PUT as a POST - MySQL will reinsert everything into that table,
// overwriting data field as the second part of the composite key when given the same value for the first.
// ONLY drawback is that if there is an autoincrement counter, this POST will increase it.
// Given that we don't even have that on this table, I'm just cheezing it with a POST instead.
router.post('/update/:id?', async (req, res, next) => {
    try {
        const id = req.params?.id;
        const del_blogtags_at = await DB.BlogTags.do.destroy(id);
        const blogtags_array = req.body.blogtags_array;
        if (await del_blogtags_at) {
            const blogtags = await DB.BlogTags.do.create_new(blogtags_array);
            res.status(200).send(blogtags);
        } else {
            res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
        }
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.delete('/:id?', async (req, res, next) => {
    try {
        const id = req.params?.id;
        const del_blogtags_at = await DB.BlogTags.do.destroy(id);
        res.status(200).send(del_blogtags_at);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

export default router;