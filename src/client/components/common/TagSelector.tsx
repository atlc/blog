import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IBlogTags } from '../../utils/types';
import { ITags } from '../../utils/types';


const TagSelector = (props: TagSelectorProps) => {
    const { id, disabled, onSelectChange } = props;
    const [allTags, getAllTags] = useState<IBlogTags[]>(null);
    const [myTags, updateMyTags] = useState<IBlogTags[]>();
    const [selectedTags, updateSelectedTags] = useState(allTags);


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
                if (id === undefined && allTags) {
                    return updateMyTags(allTags);
                } else if (id === undefined) {
                    return
                }
                const res = await fetch(`/api/blogtags/${id}`);
                let tags = await res.json();
                let parsedTags: ITags[] = tags[0];
                let myOptions: any = [];
                parsedTags.map(tag => myOptions.push({ value: `${tag.id}`, label: `${tag.name}` }));
                if (id === undefined && allTags) {
                    updateMyTags(allTags);
                }
                updateMyTags(myOptions);
                updateSelectedTags(myOptions);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [allTags]);

    useEffect(() => {
        onSelectChange(selectedTags);
    }, [selectedTags])

    const updateSelected = (selectedOptions: any) => updateSelectedTags(selectedOptions);

    if (!myTags) return <></>

    return (
        <>
            <Select
                defaultValue={[...myTags]}
                isMulti
                isDisabled={disabled}
                name="tags"
                options={allTags}
                onChange={updateSelected}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>
    )
};

interface TagSelectorProps {
    id?: string;
    disabled: boolean;
    onSelectChange(a: any): void;
}

export default TagSelector;