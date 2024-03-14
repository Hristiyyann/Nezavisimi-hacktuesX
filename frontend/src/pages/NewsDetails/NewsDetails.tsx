import NewsCard from "./components/NewsCard";
import Search from "./components/Search/Search";
import classes from './style.module.less';

function NewsDetails() {
    return (
        <div className = {classes.container}>
            <Search/>
            
            <NewsCard/>
        </div>
    )
}

export default NewsDetails;