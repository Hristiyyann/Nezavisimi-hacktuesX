import { Input } from 'antd';
import classes from './style.module.less';

type SearchProps = {
    searchValue: string | undefined;
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function Search({ searchValue, setSearchValue }: SearchProps) {
    return (
        <div className = {classes.container}>
            <Input
                value = {searchValue}
                onChange = {event => setSearchValue(event.target.value)}
                style = {{ width: 590 }}
            />
        </div>
    )
}

export default Search;