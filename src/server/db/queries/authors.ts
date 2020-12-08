import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from Authors');
const single = async (id: string) => Query('SELECT * from Authors where id = ?', [id]);
const create_new = async (attr1: string, attr2: string) => Query('INSERT into Authors SET ?', { attr1, attr2 });
const destroy = async (id: string) => Query('DELETE from Authors where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Authors SET ? where ?', [{content}, {id}]);

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