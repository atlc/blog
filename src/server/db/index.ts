import * as mysql from 'mysql';
import config from '../config';
import Blogs from './queries/blogs';
import Authors from './queries/authors';
import Tags from './queries/tags';
import BlogTags from './queries/blogtags';

// Some 300 IQ db config/setup from Luke
const pool = mysql.createPool(config.mysql); 

export const Query = <T = any>(query: any, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
}

export default {
    Blogs,
    Authors,
    Tags,
    BlogTags
}