import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import Profile from "components/Profile/Profile";
import SearchTabs from "components/SearchTabs/SearchTabs";
import classes from './style.module.less';

function NewsDetails() {
    return (
        <div className = {classes.container}>
            <Profile/>

            <SearchTabs/>

            <NewsCardsList/>

        </div>
    )
}

export default NewsDetails;