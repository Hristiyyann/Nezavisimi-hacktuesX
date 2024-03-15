import { ConfigProvider } from 'antd';
import Context from 'contexts/AppContext';
import { useEffect, useState } from 'react';
import NewsDetails from './pages/NewsDetails/NewsDetails';
import './styles/App.less';

const colorPrimary = '#50C7C7';

function App() {
    const [accessToken, setAccessToken] = useState(window.localStorage.getItem('accessToken'));
    const [keywords, setKeywords] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', colorPrimary);
        document.documentElement.style.setProperty('--primary-10', colorPrimary + '1A');
    }, []);

    return (
        <ConfigProvider
            componentSize = 'large'
            theme = {{ token: { colorPrimary: '#50C7C7' }}}
        >
            <Context.Provider
                value = {{ 
                    accessToken, setAccessToken,
                    keywords, setKeywords,
                    userName, setUserName
                }}
            >
                <NewsDetails/>
            </Context.Provider>
        </ConfigProvider>
    )
}

export default App
