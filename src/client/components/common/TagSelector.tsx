import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IBlogTags } from '../../utils/types';
import { ITags } from '../../utils/types';


const TagSelector = (props: TagSelectorProps) => {
    const { id, disabled } = props;
    const [allTags, getAllTags] = useState<IBlogTags[]>();
    const [myTags, updateMyTags] = useState<IBlogTags[]>();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/tags');
            let tags: ITags[] = await res.json();
            let allOptions: any = [];
            tags.map(t => allOptions.push({ value: `${t.id}`, label: `${t.name}` }));
            getAllTags(allOptions);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/blogtags/${id}`);
                let tags = await res.json();
                let parsedTags: ITags[] = tags[0];
                let myOptions: any = [];
                //@ts-ignore
                parsedTags.map(tag => myOptions.push({ value: `${tag.id}`, label: `${tag.name}` }));
                updateMyTags(myOptions);
                console.log(myOptions);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (!myTags) return <></>

    return (
        <>
            <Select
                defaultValue={[...myTags]}
                isMulti
                isDisabled={disabled}
                name="tags"
                options={allTags}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>
    )
};

interface TagSelectorProps {
    id?: string;
    disabled: boolean;
}

export default TagSelector;