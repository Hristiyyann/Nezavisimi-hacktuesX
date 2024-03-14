import { ConfigProvider } from 'antd';
import './styles/App.less';
import NewsDetails from './pages/NewsDetails/NewsDetails';

function App() {
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
