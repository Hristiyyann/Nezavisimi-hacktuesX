import { useState } from "react";
import Tab from "./Tab/Tab";
import classes from './style.module.less';
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";

function SearchTabs() {
    const [activeTab, setActiveTab] = useState<'titleOrLink' | 'keywords'>('titleOrLink');

    const getTabComponent = () => {
        if (activeTab === 'titleOrLink') return <Search/>;

        return <Tags/>
    }

    return (
        <div className = {classes.tabsContainer}>
            <div className = {classes.label}>
                Търси за <span className = {classes.newsLabel}>новини</span> по:
            </div>

            <div className = {classes.options}>
                <Tab 
                    text = "Заглавие или линк"
                    onClick = {() => setActiveTab('titleOrLink')}
                    isActive = {activeTab === 'titleOrLink'}
                />

                <Tab
                    text  = "Ключови думи"
                    onClick = {() => setActiveTab('keywords')}
                    isActive = {activeTab === 'keywords'}
                />
            </div>

            <div style = {{ alignSelf: 'center' }}>
                {getTabComponent()}
            </div>
        </div>
    )
}

export default SearchTabs;