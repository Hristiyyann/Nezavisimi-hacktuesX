import { Input } from 'antd';
import classes from './style.module.less';

const { Search: SearchComponent } = Input;

type SearchProps = {
    searchValue: string | undefined;
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleSearch: () => Promise<void>;
}

function Search({ searchValue, setSearchValue, handleSearch }: SearchProps) {
    return (
        <div className = {classes.container}>
            <SearchComponent
                value = {searchValue}
                onChange = {event => setSearchValue(event.target.value)}
                style = {{ width: 400 }}
                onSearch = {handleSearch}
            />
        </div>
    )
}

export default Search;