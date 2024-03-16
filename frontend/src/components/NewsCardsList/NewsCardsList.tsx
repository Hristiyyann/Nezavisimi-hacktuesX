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
                [...Array(2).keys()].map((key, index) => 
                    <Skeleton
                        key = {index}
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
                stats.map(({ title, link, photo, scores, explanation }) => 
                    <NewsCard {...{ title, link, photo, scores, explanation }}/>
                )
            }
            </>
        }
        </div>
    )
}

export default NewsCardsList;