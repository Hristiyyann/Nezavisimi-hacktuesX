import { useEffect, useState } from "react";
import Tab from "./Tab/Tab";
import classes from './style.module.less';
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";
import useRequest from "hooks/useRequest";
import { Stats } from "types";
import { Button, message } from "antd";

type SearchTabsProps = {
    setNews: React.Dispatch<React.SetStateAction<Stats[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchTabs({ setNews, setLoading }: SearchTabsProps) {
    const [searchValue, setSearchValue] = useState<string>();
    const [activeTab, setActiveTab] = useState<'titleOrLink' | 'keywords' | 'ownText'>('titleOrLink');
    const { performer } = useRequest({ url: `/api/search?SearchPreference=${searchValue}`, method: 'get' });

    useEffect(() => {
        setSearchValue(undefined);
        setLoading(false);
    }, [activeTab]);

    const handleSearch = async () => {
        if (!searchValue) return;
    
        setLoading(true);
        const data = await performer<Stats[]>();
        if (!data) {
            return;
            message.error('Няма намерени статии');
        }

        setNews(data);
        setLoading(false);
    }

    const getTabComponent = () => {
        if (activeTab === 'titleOrLink') {
            return (
                <Search {...{ setSearchValue, searchValue }}/>
            )
        } 

        return <Tags {...{ setSearchValue }}/>
    }

    return (
        <div className = {classes.tabsContainer}>
            <div className = {classes.label}>
                Търси и <span className = {classes.newsLabel}>оцени</span> по:
            </div>

            <div className = {classes.options}>
                <Tab 
                    text = 'Заглавие или линк'
                    onClick = {() => setActiveTab('titleOrLink')}
                    isActive = {activeTab === 'titleOrLink'}
                />

                <Tab
                    text  = 'Ключови думи'
                    onClick = {() => setActiveTab('keywords')}
                    isActive = {activeTab === 'keywords'}
                />

                <Tab 
                    text = 'Собствен текст'
                    onClick = {() => setActiveTab('ownText')}
                    isActive = {activeTab === 'ownText'}
                />
            </div>

            <div style = {{ alignSelf: 'center' }}>
                {getTabComponent()}
            </div>

            <Button
                
                type = 'primary'
                onClick = {handleSearch}
                style = {{ alignSelf: 'center' }}
            >
                Търси
            </Button>
        </div>
    )
}

export default SearchTabs;