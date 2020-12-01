import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from Tags');
const single = async (id: string) => Query('SELECT * from Tags where id = ?', [id]);
const create_new = async (attr1: string, attr2: string) => Query('INSERT into Tags SET ?', { attr1, attr2 });
const destroy = async (id: string) => Query('DELETE from Tags where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Tags SET ? where ?', [{content}, {id}]);


/* 
    Trying to get good export structure to make it read more like written English, like:
        - db.Tags.get.all()
        - db.Tags.get.single(id)
        - db.Tags.do.create_new(data, blah, blahblah)
        - db.Tags.do.destroy(id)
        - db.Tags.do.update(id, updatedData)
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