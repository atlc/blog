import React from 'react';
import moment from 'moment';
import { IBlogs } from '../../utils/types';
import { Link } from 'react-router-dom';

const BlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id } = props;

    return (
        <div className="card text-white bg-light m-3 shadow-lg" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark">{content.slice(0, 150)}<strong> ...</strong></p>
            </div>
            <div className="card-footer bg-primary" style={{ opacity: 0.5 }}>
                <p>Last updated {moment(updated_at).startOf('minute').fromNow()}</p>
                <Link to={`/blogs/${id}`} className="btn btn-secondary">See more</Link>
            </div>
        </div>
    );
}

export default BlogCard;