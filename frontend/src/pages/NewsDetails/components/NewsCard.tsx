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
            <div className = {classes.detailsContainer}>
                <Image
                
                    height = {200}
                    src = 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D'
                    preview = {false}
                />

                <div className = {classes.values}>
                    <div>
                        <div className = {classes.label}>Заглавие:</div>
                        <div className = {classes.value}>Бойко Борисов и златните джуджета</div>
                    </div>

                    <div>
                        <div className = {classes.label}>Линк:</div>
                        <a 
                            target = '_blank'
                            href = 'https://pik.bg/%D0%B5%D0%BA%D1%88%D1%8A%D0%BD-%D0%BC%D0%BB%D0%B0%D0%B4%D0%BE%D0%BA-%D0%BE%D1%82-%D0%B3%D0%B5%D1%80%D0%B1-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B0%D0%BB%D0%B8-%D0%BF%D1%80%D0%BE%D0%BC%D1%8F%D0%BD%D0%B0%D1%82%D0%B0-%D0%B7%D0%B0%D1%80%D0%B0%D0%B4%D0%B8-%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0-%D0%BD%D0%B0-%D0%BA%D0%BE%D0%BA%D0%BE%D1%80%D1%87%D0%BE-%D0%BC%D1%8A%D1%81%D1%82%D1%8F%D1%82-%D0%BC%D1%83-%D1%81-%D0%B4%D0%B6%D0%B8%D0%BF%D0%BA%D0%B0%D1%82%D0%B0-%D0%BD%D0%B0-%D0%B1-news1220450.html' 
                            className = {classes.value}
                        >
                            Бойко Борисов и златните джуджета
                        </a>
                    </div>
                </div>
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