import { Query } from '../index';

// Gonna be garbage queries until I get my db created  & populated
const all = async () => Query('SELECT * from Blogs');
const single = async (id: string) => Query('SELECT * from Blogs where id = ?', [id]);
const create_new = async (title: string, content: string, authorid: string) => Query('INSERT into Blogs SET ?', { title, content, authorid });
const destroy = async (id: string) => Query('DELETE from Blogs where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Blogs SET ? where ?', [{content}, {id}]);


/* 
    Trying to create export structure to make it read more like written English, like:
        - db.Blogs.get.all()
        - db.Blogs.get.single(id)
        - db.Blogs.do.create_new(data, blah, blahblah)
        - db.Blogs.do.destroy(id)
        - db.Blogs.do.update(id, updatedData)
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