import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from Blogs');
const single = async (id: string) => Query('SELECT * from Blogs where id = ?', [id]);
const create_new = async (title: string, content: string, authorid: string) => Query('INSERT into Blogs SET ?', { title, content, authorid });
const destroy = async (id: string) => Query('DELETE from Blogs where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Blogs SET ? where ?', [{content}, {id}]);
const with_my_author = async (id: string) => Query('Call spBlogAuthors(?)', [id]);
const with_authors = async () => Query('Call spBlogAuthors(null)');

export default {
    get: {
        all,
        single,
        with_my_author,
        with_authors
    }, 
    do: {
        create_new,
        destroy,
        update
    }
}