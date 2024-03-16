import { Progress } from 'antd';
import classes from './style.module.less';

type PartyStatsProps = {
    name: string;
    percentage: number;
}

function PartyStats({ name, percentage }: PartyStatsProps) {
    const getPartyConfiguration = () => {
        const parties: Record<string, { color: string, label: string }> = {
            'GERB': { color: '#00004D', label: 'Герб-СДС' },
            'BSP': { color: '#900D09', label: 'БСП' },
            'PP-DB': { color: '#B8E2F4', label: 'ПП-ДБ' },
            'Vuzrazhdane': { color: '#74B72E', label: 'Възраждане' },
            'ITN': { color: '#FFE139', label: 'ИТН'},
            'DPS': { color: '#00004D', label: 'ДПС'},
        }

        return parties[name];
    }

    return (
        <div style = {{ width: 280 }}>
            <span className = {classes.label}>
                {getPartyConfiguration().label}
            </span>

            <Progress
                percent = {percentage}
                strokeColor = {getPartyConfiguration().color}
            />
        </div>
    )
}

export default PartyStats;