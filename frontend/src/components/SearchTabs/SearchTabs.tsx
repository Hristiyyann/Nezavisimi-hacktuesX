import { useEffect, useState } from "react";
import Tab from "./Tab/Tab";
import classes from './style.module.less';
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";
import useRequest from "hooks/useRequest";
import { Stats } from "types";

type SearchTabsProps = {
    setNews: React.Dispatch<React.SetStateAction<Stats[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchTabs({ setNews, setLoading }: SearchTabsProps) {
    const [searchValue, setSearchValue] = useState<string>();
    const [activeTab, setActiveTab] = useState<'titleOrLink' | 'keywords'>('titleOrLink');
    const { performer } = useRequest({ url: `/api/search?SearchPreference=${searchValue}`, method: 'get' });

    useEffect(() => {
        if (!searchValue) return;

        setSearchValue(undefined);
    }, [activeTab]);

    const handleSearch = async () => {
        if (!searchValue) return;

        setLoading(true);
        const data = await performer<Stats[]>();
        if (!data) return;

        setNews(data);
        setLoading(false);
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