import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from BlogTags');
const single = async (id: string) => Query('SELECT * from BlogTags where id = ?', [id]);
const create_new = async (attr1: string, attr2: string) => Query('INSERT into BlogTags SET ?', { attr1, attr2 });
const destroy = async (id: string) => Query('DELETE from BlogTags where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE BlogTags SET ? where ?', [{content}, {id}]);


/* 
    Trying to get good export structure to make it read more like written English, like:
        - db.BlogTags.get.all()
        - db.BlogTags.get.single(id)
        - db.BlogTags.do.create_new(data, blah, blahblah)
        - db.BlogTags.do.destroy(id)
        - db.BlogTags.do.update(id, updatedData)
*/
export default {
    get: {
        all,
        single
    }, 
    do: {
        create_new,
        destroy,
        update
    }
}