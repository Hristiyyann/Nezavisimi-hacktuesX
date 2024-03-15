import { ConfigProvider } from 'antd';
import { Router } from 'components';
import Context from 'contexts/AppContext';
import { useEffect, useState } from 'react';
import componentConfiguration from 'styles/UIConfiguration';
import './styles/App.less';

const colorPrimary = '#143F68';

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
            theme = {{ token: { ...componentConfiguration, colorPrimary }}}
        >
            <Context.Provider
                value = {{ 
                    accessToken, setAccessToken,
                    keywords, setKeywords,
                    userName, setUserName
                }}
            >
                <Router/>
            </Context.Provider>
        </ConfigProvider>
    )
}

export default App
