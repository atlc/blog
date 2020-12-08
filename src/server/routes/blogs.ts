import DB from '../db';
import * as express from 'express';
const router = express.Router();



router.get('/:id?/author', async (req, res, next) => {
    try {
        const dto = req;
        const id = dto.params.id;
        const blog_with_author = await DB.Blogs.get.my_author(id);
        res.status(200).json(blog_with_author);
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id/edit', async (req, res, next) => {
    try {
        const dto = req;
        const id = dto.params.id;
        const blog = await DB.Blogs.get.single(id);
        res.status(200).json(blog);
    } catch (e) {
        console.log(e);
    }
});

router.get('/with_authors', async (req, res, next) => {
    try {
        const blogs_authors = await DB.Blogs.get.authors();
        res.status(200).send(blogs_authors);
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id?', async (req, res, next) => {
    try {
        const params = req.params;
        const id = params.id;
        const blogs = (!!id) ? await DB.Blogs.get.single(id) : await DB.Blogs.get.all();
        res.status(200).json(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send('A server error has occurred. Please check the server logs for more info.');
    }
});

router.post('/', async (req, res, next) => {
    try {
        const CURRENT_NUMBER_OF_AUTHORS = 4; // Fake it 'til you make it, at least until Auth time
        const body = req.body;
        const title = body.title;
        const content = body.content;
        const authorid = (Math.floor(Math.random() * CURRENT_NUMBER_OF_AUTHORS) + 1).toString();  // Fake it 'til you make it, at least until Auth time
        const newBlog = await DB.Blogs.do.create_new(title, content, authorid);
        res.status(200).json(newBlog);
    } catch (e) {
        console.log(e);
        res.status(500).send('A server error has occurred. Please check the server logs for more info.');
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
        res.status(500).send('A server error has occurred. Please check the server logs for more info.');
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBlog = await DB.Blogs.do.destroy(id);
        res.status(200).json(deletedBlog);
    } catch (e) {
        console.log(e);
        res.status(500).send('A server error has occurred. Please check the server logs for more info.');
    }
});


export default router;
