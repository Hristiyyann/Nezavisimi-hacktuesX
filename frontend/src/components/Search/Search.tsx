import { Input } from 'antd';
import classes from './style.module.less';
import { useState } from 'react';

const { Search: SearchComponent } = Input;

function Search() {
    const [value, setValue] = useState<string>();

    async function handleSearch() {
        console.log(value);
    }

    return (
        <div className = {classes.container}>
            <SearchComponent
                value = {value}
                onChange = {event => setValue(event.target.value)}
                style = {{ width: 400 }}
                onSearch = {handleSearch}
            />
        </div>
    )
}

export default Search;