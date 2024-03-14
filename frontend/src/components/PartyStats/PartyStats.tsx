import { Progress } from 'antd';
import classes from './style.module.less';

type PartyStatsProps = {
    name: string;
    color: string;
    percentage: number;
}

function PartyStats({ name, color, percentage }: PartyStatsProps) {
    return (
        <div style = {{ width: 300 }}>
            <span
                className = {classes.label}
                style = {{ color }}
            >
                {name}
            </span>

            <Progress
                percent = {percentage}
                strokeColor = {color}
            />
        </div>
    )
}

export default PartyStats;