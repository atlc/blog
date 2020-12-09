import React, { useState } from 'react';
import { IBlogs } from '../../utils/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import TagSelector from '../../components/common/TagSelector';

const EditableBlogCard = (props: IBlogs) => {
    const { title, content, id } = props;
    const [blogText, updateBlogText] = useState(content);
    const [blogTags, updateBlogTags] = useState(null);

    const handleBlogtextUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(e.target.value);
    const handleSelectedTagsUpdate = (tagsFromChild: any) => updateBlogTags(tagsFromChild);
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((t: any) => t.value).map((tagid: string) => [`${blogID}`, tagid]);

    const updateBlog = async () => {
        const blogsOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                content: blogText
            })
        };

        fetch('/api/blogs', blogsOptions)
            .then(res => res.status)
            .then(put_results => {
                notify(put_results, "Blog was", "updated");
                setTimeout(() => {
                    window.history.go(-2);
                }, 3000)
            })


        // Running what should be a PUT as a POST - MySQL will reinsert everything into that table,
        // overwriting data field as the second part of the composite key when given the same value for the first.
        // ONLY drawback is that if there is an autoincrement counter, this POST will increase it.
        // Given that we don't even have that on this table, I'm just cheezing it with a POST instead.
        const blogTagsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogtags_array: createBulkFriendlyBlogTagsSQL(id)
            })
        };
        const bt = await fetch(`/api/blogtags/update/${id}`, blogTagsOptions);
        // const btson = await bt.json();
        // console.log(btson);
    }

    const deleteBlog = () => {
        const reqOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        // Synchronous-asynchronous code to deal with database deletions. Ugh 
        fetch(`/api/blogtags/${id}`, reqOptions)
            .then(() => {
                fetch(`/api/blogs/${id}`, reqOptions)
                    .then(blogRes => {
                        notify(blogRes.status, "Blog was", "deleted");
                        setTimeout(() => {
                            window.history.go(-2);
                        }, 3000)
                    })
            })
    }

    const notify = (stat: number, item: string, requestVerb: string) => {
        if (stat === 200) {
            toast.success(`😎 ${item} ${requestVerb}!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(`😞 ${item} not ${requestVerb}, please check server logs for further details.`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    if (!id) {
        return (
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">Loading SingleCard...</div>
            </div>
        );
    }

    return (
        <>
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">{title}</div>
                <div className="card-body">
                    <textarea className="text-dark" value={blogText} rows={10} cols={80} onChange={handleBlogtextUpdate}></textarea>
                </div>
                <div className="card-footer bg-primary" >
                    <div className="row text-dark">
                        <TagSelector disabled={false} id={id} onSelectChange={handleSelectedTagsUpdate} />
                    </div>
                    <button className="btn btn-secondary m-2 shadow" onClick={updateBlog}>Save Changes!</button>
                    <button className="btn btn-warning m-2 shadow" onClick={deleteBlog}>Delete Blog?</button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}


export default EditableBlogCard;