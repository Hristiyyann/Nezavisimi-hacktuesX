import { useMemo, useState } from "react";
import { Tabs, type TabsProps } from 'antd';
import Search from "components/Search/Search";
import Tags from "components/Tags/Tags";
import classes from './style.module.less';

function SearchTabs() {
    const [activeTab, setActiveTab] = useState('titleOrLink');

    const tabs: TabsProps['items'] = useMemo(() => ([
        {
            key: 'titleOrLink',
            label: 'Заглавие или линк',
            children: <Search/>
        },
        {
            key: 'keywords',
            label: 'Вашите ключови думи',
            children: <Tags/>
        },
    ]), []);

    return (
        <div className = {classes.tabsContainer}>
            <div className = {classes.label}>Търсене по:</div>

            <Tabs
                defaultActiveKey = {activeTab}
                items = {tabs}
                onChange = {key => setActiveTab(key)}
            >

            </Tabs>
        </div>
    )
}

export default SearchTabs;