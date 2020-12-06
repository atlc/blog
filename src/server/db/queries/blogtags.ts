import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from BlogTags');
const from_blog = async (id: string) => Query('CALL spBlogTags(?)', [id]);
const create_new = async (attr1: string, attr2: string) => Query('INSERT into BlogTags SET ?', { attr1, attr2 });
const destroy = async (id: string) => Query('DELETE from BlogTags where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE BlogTags SET ? where ?', [{content}, {id}]);

export default {
    get: {
        all,
        from_blog
    }, 
    do: {
        create_new,
        destroy,
        update
    }
}