import { Image } from 'antd';
import PartyStats from 'components/PartyStats/PartyStats';
import { useEffect, useState } from 'react';
import { Scores, Stats } from 'types';
import classes from './style.module.less';

function NewsCard({ title, link, photo, scores }: Stats) {
    const [sortedStats, setSordedStats] = useState<Scores>(scores);

    useEffect(() => {
        const keys = Object.keys(scores).sort((a,b) => scores[b] - scores[a]);
        
        const sortedStats: Scores = {};
        keys.forEach(key => sortedStats[key] = scores[key]);
        setSordedStats(sortedStats)
    }, []);

    return (
        <div className = {classes.container}>
            <div className = {classes.detailsContainer}>
                <Image
                    width = {260}
                    height = {160}
                    src = {photo}
                    preview = {false}
                />

                <div className = {classes.values}>
                    <div>
                        <div className = {classes.label}>Заглавие:</div>
                        <div className = {classes.value}>{title}</div>
                    </div>

                    <div>
                        <div className = {classes.label}>Линк:</div>
                        <a 
                            target = '_blank'
                            href = {link} 
                            className = {classes.link}
                        >
                            {link}
                        </a>
                    </div>
                </div>
            </div>
            
            <div style = {{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {
                Object.keys(sortedStats).map(party =>
                    <PartyStats
                        name = {party}
                        percentage = {+(sortedStats[party] * 100).toFixed(0)}
                    />
                )
            }
            </div>
        </div>
    )
}

export default NewsCard;