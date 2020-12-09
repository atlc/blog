import { Query } from '../index';

const all = async () => Query('Call spAllBlogTags()');
const from_blog = async (id: string) => Query('CALL spBlogTags(?)', [id]);
const create_new = async (bt_as_array: any) => Query('INSERT into BlogTags (blogid, tagid) VALUES ?', [bt_as_array]);
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