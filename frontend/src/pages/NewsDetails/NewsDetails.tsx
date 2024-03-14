import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import Search from "./components/Search/Search";
import classes from './style.module.less';
import Tags from "components/Tags/Tags";

function NewsDetails() {
    return (
        <div className = {classes.container}>
            <Search/>
            
            <Tags/>
            
            <NewsCardsList/>

        </div>
    )
}

export default NewsDetails;