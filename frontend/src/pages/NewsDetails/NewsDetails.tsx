import NewsCardsList from "components/NewsCardsList/NewsCardsList";
import Profile from "components/Profile/Profile";
import SearchTabs from "components/SearchTabs/SearchTabs";
import classes from './style.module.less';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import NavbarContext from "contexts/NavbarContext";

function NewsDetails() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log(accessToken);
        if (!accessToken) navigate('/'); 
    }, []);

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