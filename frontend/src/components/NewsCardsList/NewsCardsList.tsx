import NewsCard from "components/NewsCard/NewsCard";
import classes from './style.module.less';
import { Skeleton } from "antd";
import { useState } from "react";

function NewsCardsList() {
    const [loading, setLoading] = useState(false);

    return (
        <div className = {classes.list}>
        {
            loading
            ?
            <>
                <Skeleton 
                    loading 
                    active 
                    className = {classes.skeleton}
                />

                <Skeleton 
                    loading 
                    active 
                    className = {classes.skeleton}
                />
            </>
            :
            <>
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
            </>
        }
        </div>
    )
}

export default NewsCardsList;