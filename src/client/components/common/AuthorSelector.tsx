import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IAuthors } from '../../utils/types';

const AuthorSelector = (props: AuthorSelectorProps) => {
    const { onSelectChange } = props;
    const [fullAuthorsList, updateAuthors] = useState<IAuthors[]>(null);
    const [selectedAuthor, updateSelectedAuthor] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/authors');
            let authors: IAuthors[] = await res.json();
            let allAuthors: any = [];
            authors.map(a => allAuthors.push({ value: `${a.id}`, label: `${a.name}` }));
            updateAuthors(allAuthors);
            updateSelectedAuthor(allAuthors[0]);
        })()
    }, [])

    useEffect(() => {
        onSelectChange(selectedAuthor);
    }, [selectedAuthor])

    if (!fullAuthorsList) return <></>
    
    const updateSelected = (selectedOption: any) => updateSelectedAuthor(selectedOption);

    return (
        <>
            <Select
                defaultValue={fullAuthorsList[0]}
                name="tags"
                onChange={updateSelected}
                options={fullAuthorsList}
                className="basic-multi-select text-black"
                classNamePrefix="select"
            />
        </>
    )
};

interface AuthorSelectorProps { 
    onSelectChange(a: any): void;
}

export default AuthorSelector;