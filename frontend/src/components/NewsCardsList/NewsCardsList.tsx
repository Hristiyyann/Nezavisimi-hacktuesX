import NewsCard from "components/NewsCard/NewsCard";
import classes from './style.module.less';

function NewsCardsList() {
    return (
        <div className = {classes.list}>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
        </div>
    )
}

export default NewsCardsList;