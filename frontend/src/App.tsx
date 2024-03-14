import { ConfigProvider } from 'antd';
import './App.css';

function App() {
    return (
        <ConfigProvider
            theme = {{ token: { colorPrimary: '#50C7C7' }}}
        >
            
        </ConfigProvider>
    )
}

export default App
