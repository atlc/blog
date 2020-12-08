import React, { useEffect, useState } from 'react';
import { IBlogs } from '../../utils/types';
import SingleBlogCard from '../../components/blogs/SingleBlogCard';
import { v4 as uuidv4 } from 'uuid';

const SingleBlog = (props: SingleBlogProps) => {
    const id = props.match.params.id;
    const [blog, updateBlog] = useState();

    useEffect(() => {
        (async () => {
            try {
                // const res = await fetch(`/api/blogs/${id}`);
                // Using this endpoint since it fetches blog + author info in stored procedure
                const res = await fetch(`/api/blogs/${id}/author`);
                let blogs = await res.json();
                updateBlog(blogs[0][0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="row">
            {blog ? <SingleBlogCard key={uuidv4()} {...blog} /> : <h2>Loading SingleBlog...</h2>}
        </div>
    );
};

interface SingleBlogProps {
    match: any;
    params: any;
    id: string;
};


export default SingleBlog;