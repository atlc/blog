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
                const res = await fetch(`/api/blogs/${id}`);
                let blog = await res.json();
                updateBlog(blog[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="row">
            <SingleBlogCard key={uuidv4()} {...blog} />
        </div>
    );
};

interface SingleBlogProps {
    match: any;
    params: any;
    id: string;
};


export default SingleBlog;