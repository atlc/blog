import DB from '../db';
import * as express from 'express';
const router = express.Router();

router.get('/:id?/edit', async (req, res, next) => {
    try {
        const dto = req;
        const id = dto.params.id;
        const blog_with_author = await DB.Blogs.get.with_my_author(id);
        res.status(200).json(blog_with_author);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.get('/:id?', async (req, res, next) => {
    try {
        const params = req.params;
        const id = params.id;
        const blogs = (!!id) ? await DB.Blogs.get.with_my_author(id) : await DB.Blogs.get.with_authors();
        res.status(200).json(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const title = body.title;
        const content = body.content;
        const authorid = body.authorid;
        const newBlog = await DB.Blogs.do.create_new(title, content, authorid);
        res.status(200).json(newBlog);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const dto = req.body;
        const id = dto.id;
        const content = dto.content;
        console.log(id, content)
        const blogUpdate = await DB.Blogs.do.update(id, content);
        res.status(200).json(blogUpdate);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBlog = await DB.Blogs.do.destroy(id);
        res.status(200).json(deletedBlog);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});


export default router;
