import { useEffect, useState } from "react";
import Tab from "./Tab/Tab";
import classes from './style.module.less';
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";
import useRequest from "hooks/useRequest";

function SearchTabs() {
    const [searchValue, setSearchValue] = useState<string>();
    const [activeTab, setActiveTab] = useState<'titleOrLink' | 'keywords'>('titleOrLink');
    const { performer, getLoading } = useRequest({ url: `/api/search?SearchPreference=${searchValue}`, method: 'get' });

    useEffect(() => {
        if (!searchValue) return;

        setSearchValue(undefined);
    }, [activeTab]);

    const handleSearch = async () => {
        if (!searchValue) return;
        const data = await performer();

        console.log(data);
    }

    const getTabComponent = () => {
        if (activeTab === 'titleOrLink') {
            return (
                <Search {...{ setSearchValue, searchValue, handleSearch }}/>
            )
        } 

        return <Tags {...{ searchValue, setSearchValue, handleSearch }}/>
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