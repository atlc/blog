import DB from '../db';
import * as express from 'express';
const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    try {
        const params = req.params;
        const id = params.id;
        let authors = (!!id) ? await DB.Authors.get.single(id) : await DB.Authors.get.all();
        res.status(200).json(authors);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

export default router;
