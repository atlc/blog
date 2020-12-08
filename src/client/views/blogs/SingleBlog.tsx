import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleBlogCard from '../../components/blogs/SingleBlogCard';
import { v4 as uuidv4 } from 'uuid';

const SingleBlog = () => {
    const { id } = useParams<SingleBlogProps>();
    const [blog, updateBlog] = useState();

    useEffect(() => {
        (async () => {
            try {
                // This endpoint fetches blog + author info in stored procedure
                const res = await fetch(`/api/blogs/${id}`);
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
    id: string;
};


export default SingleBlog;