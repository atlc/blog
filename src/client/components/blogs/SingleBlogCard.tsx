import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IBlogs, IBlogTags } from '../../utils/types';
import { Link } from 'react-router-dom';
import TagSelector from '../../components/common/TagSelector';



const SingleBlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id, AuthorName, AuthorEmail } = props;
    const [blogtags, updateMyTags] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                //@ts-ignore
                const res = await fetch(`/api/blogtags/${id}`);
                let tags = await res.json();
                // Returning just the data I want without the SQL response since this calls a stored procedure
                tags = tags[0].map((tag: IBlogTags) => tag.name.replace(' ', '-'));
                updateMyTags(tags);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    if (!blogtags) {
        return (
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">Loading SingleCard...</div>
            </div>
        );
    }

    return (
        <div className="card text-white bg-light m-3 shadow-lg">
            <div className="card-header text-center text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark"><em>{content}</em></p>
            </div>
            <div className="card-footer bg-primary">
                {/* <div className="row ml-2">Tags: {blogtags?.map(bt => `#${bt}, `)}</div> */}
                <TagSelector disabled={true} id={id} />
                <div className="row ml-2">Written by {AuthorName}.</div>
                <div className="row ml-2"><em>Contact:  {AuthorEmail}</em></div>
                <div className="row ml-2">Last updated {moment(updated_at).startOf('minute').fromNow()}</div>
                <div className="row ml-2">
                    <Link to={`/blogs/${id}/edit`} className="btn btn-secondary">Edit Me</Link>
                </div>
            </div>
        </div>
    );
}


export default SingleBlogCard;