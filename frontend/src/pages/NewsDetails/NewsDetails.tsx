import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import SearchTabs from "components/SearchTabs/SearchTabs";
import AppContext from "contexts/AppContext";
import NavbarContext from "contexts/NavbarContext";
import useRequest from "hooks/useRequest";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Keyword } from "types";
import classes from './style.module.less';

type RequestResponse = {
    success: boolean;
    result: Keyword[];
}

function NewsDetails() {
    const { performer } = useRequest({ url: '/api/keyword', method: 'get' });
    const { setKeywords } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) navigate('/'); 
    }, []);

    useEffect(() => { fetchUserKeywords(); }, []);

    const fetchUserKeywords = async () => {
        const data = await performer();
        const response = data as RequestResponse;
        console.log(response)
        setKeywords(response.result);
    }

    return (
        <NavbarContext>
            <div className = {classes.container}>
                <SearchTabs/>

                <NewsCardsList/>
            </div>
        </NavbarContext>
    )
}

export default NewsDetails;