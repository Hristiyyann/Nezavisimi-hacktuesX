import { Image, Tooltip } from 'antd';
import PartyStats from 'components/PartyStats/PartyStats';
import { useEffect, useState } from 'react';
import { Scores, Stats } from 'types';
import classes from './style.module.less';

function NewsCard({ title, explanation, link, photo, scores }: Stats) {
    const [sortedStats, setSordedStats] = useState<Scores>(scores);
    const [step, setStep] = useState<boolean>(false);

    useEffect(() => {
        const keys = Object.keys(scores).sort((a,b) => scores[b] - scores[a]);
        
        const sortedStats: Scores = {};
        keys.forEach(key => sortedStats[key] = scores[key]);
        setSordedStats(sortedStats)
    }, []);

    const getCarouselPart = () => {
        const start = !step ? 0 : 3;
        const end = !step ? 3 : 6;

        return (
            Object.keys(sortedStats).slice(start, end).map(party =>
                <PartyStats
                    name = {party}
                    percentage = {+(sortedStats[party] * 100).toFixed(0)}
                />
            )
        )
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.detailsContainer}>
                <Image
                    width = {280}
                    height = {180}
                    src = {photo}
                    preview = {false}
                />

                <div className = {classes.values}>
                    <div className = {classes.value}>{title}</div>
                
                    <a 
                        target = '_blank'
                        href = {link} 
                        className = {classes.link}
                    >
                        Линк към новината
                    </a>
                </div>
            </div>

            <div style = {{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className = {classes.tooltip}>
                    <Tooltip
                        trigger = {'hover'} 
                        title = {explanation}
                    >
                        Какво означава?
                    </Tooltip>
                </div>
            {
                getCarouselPart()
            }
                <div
                    className = {classes.chevron}
                    onClick = {() => setStep(prev => !prev)}
                >
                    {!step ? '>' : '<'} 
                </div>
            </div>

        </div>
    )
}

export default NewsCard;