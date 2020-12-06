import React from 'react';
import moment from 'moment';
import { IBlogs } from '../../utils/types';

const BlogCard = (props: IBlogs) => {
    const { title, content, updated_at } = props;

    return (
        <div className="card text-white bg-light m-3 shadow-lg" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark">{content.slice(0, 150)}...</p>
            </div>
            <div className="card-footer bg-primary" style={{ opacity: 0.5 }}>
                Last updated at {moment(updated_at).startOf('hour').fromNow()}
            </div>
        </div>
    );
}

export default BlogCard;