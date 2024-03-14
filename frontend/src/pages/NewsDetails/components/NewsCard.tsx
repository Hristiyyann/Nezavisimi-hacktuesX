import { Image } from 'antd';
import classes from './style.module.less';
import PartyStats from 'components/PartyStats/PartyStats';

function NewsCard() {
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
            <Image
              
                height = {150}
                src = 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D'
                preview = {false}
            />

            <div>
                <div>title</div>

                <div>link</div>
            </div>
            
            <div>
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