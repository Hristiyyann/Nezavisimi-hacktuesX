import { Skeleton } from "antd";
import NewsCard from "components/NewsCard/NewsCard";
import { Stats } from "types";
import classes from './style.module.less';

type NewsCardsList = {
    stats: Stats[];
    loading: boolean;
}

function NewsCardsList({ stats, loading }: NewsCardsList) {
    return (
        <div 
            className = {classes.list}
            style = {loading ? { gap: 50 } : undefined}
        >
        {
            loading
            ?
            <div className = {classes.skeletionList}>
            {
                [...Array(2).keys()].map(() => 
                    <Skeleton 
                        loading 
                        active 
                        className = {classes.item}
                    />
                )
            }
            </div>
            :
            <>
            {
                stats.map(({ title, link, photo, scores }) => 
                    <NewsCard {...{ title, link, photo, scores }}/>
                )
            }
            </>
        }
        </div>
    )
}

export default NewsCardsList;