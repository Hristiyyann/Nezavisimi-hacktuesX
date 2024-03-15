import { Tag } from 'antd';
import AppContext from 'contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

type TagsProps = {
    searchValue: string | undefined;
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleSearch: () => Promise<void>;
}

function Tags({ searchValue, setSearchValue, handleSearch }: TagsProps) {
    const { keywords } = useContext(AppContext);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        setSearchValue(selectedTags.join(' '));
    }, [selectedTags]);

    useEffect(() => {
        if (!searchValue) return;

        handleSearch();
    }, [searchValue]);

    const handleTagChange = (checked: boolean, tag: string) => {
        setSelectedTags(prev => {
            checked
            ? prev.push(tag)
            : prev = prev.filter(currentTag => currentTag !== tag)

            return [...prev];
        });
    }

    return (
        <div className = 'keywords'>
        {
            keywords.map(({ id, name }) => 
                <Tag.CheckableTag
                    key = {id}
                    checked = {selectedTags.includes(name)}
                    onChange = {checked => handleTagChange(checked, name)}
                >
                    {name}
                </Tag.CheckableTag>
            )
        }
        </div>
    )
}

export default Tags;