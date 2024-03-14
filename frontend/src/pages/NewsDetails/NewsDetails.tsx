import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import Search from "./components/Search/Search";
import classes from './style.module.less';

function NewsDetails() {
    return (
        <div className = {classes.container}>
            <Search/>
            
            <NewsCardsList/>
        </div>
    )
}

export default NewsDetails;