import { Progress } from 'antd';

type PartyStatsProps = {
    name: string;
    color: string;
    percentage: number;
}

function PartyStats({ name, color, percentage }: PartyStatsProps) {
    console.log('vliza')
    return (
        <div style = {{ width: 300 }}>
            <span>{name}</span>

            <Progress
                percent = {percentage}
                style = {{ color }}
            />
        </div>
    )
}

export default PartyStats;