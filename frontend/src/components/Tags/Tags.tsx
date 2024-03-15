import { useContext, useState } from 'react';
import { Tag } from 'antd';
import AppContext from 'contexts/AppContext';

function Tags() {
    const { keywords } = useContext(AppContext);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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