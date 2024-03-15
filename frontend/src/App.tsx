import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import NewsDetails from './pages/NewsDetails/NewsDetails';
import './styles/App.less';

const colorPrimary = '#50C7C7';

function App() {
    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', colorPrimary);
        document.documentElement.style.setProperty('--primary-10', colorPrimary + '1A');
    }, []);

    return (
        <ConfigProvider
            componentSize = 'large'
            theme = {{ token: { colorPrimary: '#50C7C7' }}}
        >
            <NewsDetails/>
        </ConfigProvider>
    )
}

export default App
