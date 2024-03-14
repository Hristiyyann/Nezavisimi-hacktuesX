import NewsCard from "pages/NewsDetails/components/NewsCard";
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