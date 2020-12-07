import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IBlogs } from '../../utils/types';


const SingleBlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id } = props;
    const [blogtags, updateMyTags] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/blogtags/${id}`);
                let tags = await res.json();
                //@ts-ignore
                tags = tags[0].map(tag => tag.name)
                updateMyTags(tags);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="card text-white bg-light m-3 shadow-lg">
            <div className="card-header text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark"><em>{content}</em></p>
            </div>
            <div className="card-footer bg-primary" style={{ opacity: 0.5 }}>
                <p>Tags: {blogtags?.map(bt => `#${bt}, `)}</p>
                <p>Last updated {moment(updated_at).startOf('minute').fromNow()}</p>
            </div>
        </div>
    );
}

export default SingleBlogCard;