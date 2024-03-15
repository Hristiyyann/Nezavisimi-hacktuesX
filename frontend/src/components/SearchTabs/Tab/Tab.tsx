import classes from './style.module.less';

type TabProps = {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

function Tab({ text, onClick, isActive }: TabProps) {
    return (
        <div 
            onClick = {onClick}
            className = {`${classes.container} ${isActive ? classes.activeTab : undefined}`}
        >
            {text}
        </div>
    )
}

export default Tab;