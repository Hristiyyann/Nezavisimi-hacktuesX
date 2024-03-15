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
            {
                stats.map(stat => 
                    <NewsCard
                        title = {stat.title}
                        link = {stat.link}
                        photo = {stat.photo}
                        text = {stat.text}
                        scores = {stat.scores}
                    />
                )
            }
            </>
        }
        </div>
    )
}

export default NewsCardsList;