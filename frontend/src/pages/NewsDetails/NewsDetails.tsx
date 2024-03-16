import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import SearchTabs from "components/SearchTabs/SearchTabs";
import AppContext from "contexts/AppContext";
import NavbarContext from "contexts/NavbarContext";
import useRequest from "hooks/useRequest";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Keyword, Stats } from "types";
import classes from './style.module.less';

function NewsDetails() {
    const [news, setNews] = useState<Stats[]>([]);
    const [loading, setLoading] = useState(false);
    const { performer } = useRequest({ url: '/api/keyword', method: 'get' });
    const { setKeywords } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) navigate('/'); 
    }, []);

    useEffect(() => { fetchUserKeywords(); }, []);

    const fetchUserKeywords = async () => {
        const data = await performer<Keyword[]>();
        if (!data) return;

        setKeywords(data);
    }

    return (
        <NavbarContext>
            <div className = {classes.container}>
                <SearchTabs {...{ setNews, setLoading }}/>

                <NewsCardsList {...{ stats: news, loading }}/>
            </div>
        </NavbarContext>
    )
}

export default NewsDetails;