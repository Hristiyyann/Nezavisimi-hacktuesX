import { Image } from 'antd';
import PartyStats from 'components/PartyStats/PartyStats';
import { Stats } from 'types';
import classes from './style.module.less';

function NewsCard({ title, text, link, photo, scores }: Stats) {
    const parties = [
        {
            color: 'blue',
            name: 'Gerb',
            percentage: 50
        },
        {
            color: 'red',
            name: 'Bsp',
            percentage: 40
        },
        {
            color: 'purple',
            name: 'PP-DB',
            percentage: 13
        },
        {
            color: 'green',
            name: 'Vazrashdane',
            percentage: 12
        },
        {
            color: 'aqua',
            name: 'ITN',
            percentage: 50
        }
    ];

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
                parties.map(({ name, color, percentage }) => 
                    <PartyStats {...{ name, color, percentage }}/>
                )
            }
            </div>
        </div>
    )
}

export default NewsCard;