import React, { useEffect, useState } from 'react';
import { IBlogs, IBlogTags } from '../../utils/types';
import { ToastContainer, toast } from 'react-toastify';

const EditableBlogCard = (props: IBlogs) => {
    const { title, content, id } = props;
    const [blogText, updateBlogText] = useState(content);
    const [enableButton, setEnableButton] = useState(true);

    const handleBlogtextUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateBlogText(e.target.value);
        setEnableButton(false);
    }

    const updateBlog = async () => {
        const reqOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                content: blogText
            })
        };
        let res = await fetch('/api/blogs', reqOptions);
        let put_results = await res.status;
        notify(put_results);
    }

    const deleteBlog = async () => {
        const reqOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                content: blogText
            })
        };

        // Dummy fetch to 
        let res = await fetch('/api/lol', reqOptions);
        // let res = await fetch('/api/blogs', reqOptions);
        let delete_results = await res.status;

    }

    const notify = (resStatus: number) => {
        if (resStatus === 200) {
            toast.success('😎 Blog text was updated!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('😞 Could not update blog, please check server logs for further details.', {
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
                <div className="card-footer bg-primary" style={{ opacity: 0.5 }}>
                    <div className="row">
                        <button disabled={enableButton} className="btn btn-secondary" onClick={updateBlog}>{enableButton ? "Blog Unchanged" : "Save Changes!"}</button>
                        <button className="btn btn-warning" onClick={deleteBlog}>Delete Blog?</button>
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


export default EditableBlogCard;