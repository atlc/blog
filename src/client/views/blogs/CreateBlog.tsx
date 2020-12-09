import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import AuthorSelector from '../../components/common/AuthorSelector';
import TagSelector from '../../components/common/TagSelector';


const CreateBlog = () => {
    const [blogTitle, updateBlogTitle] = useState('');
    const [blogText, updateBlogText] = useState('');
    const [blogAuthor, updateBlogAuthor] = useState(null);
    const [blogTags, updateBlogTags] = useState(null);

    const handleBlogTextUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(event.target.value);
    const handleBlogTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateBlogTitle(event.target.value);
    const handleSelectedAuthorUpdate = (authorFromChild: any) => updateBlogAuthor(authorFromChild);
    const handleSelectedTagsUpdate = (tagsFromChild: any) => updateBlogTags(tagsFromChild);

    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((t: any) => t.value).map((tagid: string) => [`${blogID}`, tagid]);

    const createBlog = async () => {
        const blogsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authorid: blogAuthor.value,
                title: blogTitle,
                content: blogText
            })
        };
        const res = await fetch('/api/blogs', blogsOptions);
        const blogPost = await res.json()
        const blogID = blogPost.insertId;
        const blogPostStatus = res.status;

        const blogTagsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogtags_array: createBulkFriendlyBlogTagsSQL(blogID)
            })
        };
        const bt = await fetch('/api/blogtags/update', blogTagsOptions);
        const blogTagsPostStatus = bt.status;

        notify(blogPostStatus, blogTagsPostStatus);
    }

    const notify = (resStatus: number, resStatus2: number) => {
        if (resStatus === 200 && resStatus2 === 200) {
            toast.success('😎 Blog post was created!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('😞 Could not create blog, please check server logs for further details.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <div className="card text-black bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">
                    <input type="text" placeholder="Title of your blog" onChange={handleBlogTitleUpdate}/>
                </div>
                <div className="card-body">
                    <textarea className="text-dark" value={blogText} rows={10} cols={80} onChange={handleBlogTextUpdate}></textarea>
                </div>
                <div className="card-footer bg-primary">
                    <div className="row">
                        <h5>Select your author:  </h5>
                    </div>
                    <div className="row">
                        <AuthorSelector onSelectChange={handleSelectedAuthorUpdate} />
                    </div>
                    <div className="row">
                        <h5>Tags: </h5>
                    </div>
                    <div className="row">
                        <TagSelector disabled={false} onSelectChange={handleSelectedTagsUpdate} />
                    </div>
                    <div className="row">
                        <button className="btn btn-secondary m-2 shadow text-white" onClick={createBlog}>Create it!</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
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

export default CreateBlog;