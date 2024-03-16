import { Input, message } from "antd";
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Stats } from "types";
import Footer from "./Footer/Footer";
import Tab from "./Tab/Tab";
import classes from './style.module.less';
import qs from 'qs';

type SearchTabsProps = {
    loading: boolean;
    setNews: React.Dispatch<React.SetStateAction<Stats[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type FiltersProps = {
    selectedMedia: string[];
    selectedNumberOfArticles: number | null;
}

function SearchTabs({ loading, setNews, setLoading }: SearchTabsProps) {
    const [searchValue, setSearchValue] = useState<string>();
    const [filters, setFilters] = useState<FiltersProps>({ selectedMedia: [], selectedNumberOfArticles: 1 });
    const [activeTab, setActiveTab] = useState<'titleOrLink' | 'keywords' | 'ownText'>('titleOrLink');
    const { performer } = useRequest({ 
        method: 'get',
        url: activeTab === 'ownText'
        ? `/api/search/ownText?SearchPreference=${searchValue}` 
        : `/api/search?SearchPreference=${searchValue}&${qs.stringify(filters)}` 
    });

    useEffect(() => {
        setSearchValue(undefined);
        setLoading(false);
    }, [activeTab]);

    const handleSearch = async () => {
        if (!searchValue) return;
    
        setLoading(true);
        setNews([]);
        const data = await performer<Stats[]>();
        if (!data) {
            setLoading(false);
            return message.error('Няма намерени статии');
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
        else if (activeTab === 'keywords') return <Tags {...{ setSearchValue }}/>
        
        return (
            <Input.TextArea
                style = {{ width: 590 }}
                autoSize={{ minRows: 13, maxRows: 20 }}
                onChange = {event => setSearchValue(event.target.value)}
            />
        )
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

            <Footer
                disableFilters = {activeTab === 'ownText'}
                {...{ loading, setFilters, handleSearch }}
            />
        </div>
    )
}

export default SearchTabs;