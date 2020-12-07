export type IBlogs = {
    id: string;
    title: string;
    content: string;
    authorid: string;
    created_at: string;
    updated_at: string;
}

export type IBlogTags = {
    blogid: string;
    tagid: string;
}