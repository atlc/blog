import { Query } from '../index';

const all = async () => Query('SELECT * from Blogs');
const single = async (id: string) => Query('SELECT * from Blogs where id = ?', [id]);
const create_new = async (title: string, content: string, authorid: string) => Query('INSERT into Blogs SET ?', { title, content, authorid });
const destroy = async (id: string) => Query('DELETE from Blogs where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Blogs SET ? where ?', [{content}, {id}]);
const with_my_author = async (id: string) => Query('Call spBlogAuthors(?)', [id]);
const with_authors = async () => Query('Call spBlogAuthors(null)');

// Naming conventions might seem HELLA weird for both the function names and their exports
// But I wanted retrieval operations to read like how they would in English
// so a call might look like `DB.Blogs.get.single(blogid)`. Same goes for `do` with the 
// "mutating" operations

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