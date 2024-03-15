import { useState } from 'react';
import { Tag } from 'antd';

function Tags() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const keywords = ['app', 'bsp', 'gerb', 'promqna', 'lsds', 'bsp', 'gerb', 'promqna', 'lsds', 'bsp', 'gerb', 'promqna', 'lsds', 'bsp', 'gerb', 'promqna', 'lsds'];

    const handleTagChange = (checked: boolean, tag: string) => {
        setSelectedTags(prev => {
            checked
            ? prev.push(tag)
            : prev = prev.filter(currentTag => currentTag !== tag)

            return [...prev];
        });
    }

    return (
        <div>
        {
            keywords.map(keyword => 
                <Tag.CheckableTag
                    key = {keyword}
                    checked = {selectedTags.includes(keyword)}
                    onChange = {checked => handleTagChange(checked, keyword)}
                >
                    {keyword}
                </Tag.CheckableTag>
            )
        }
        </div>
    )
}

export default Tags;