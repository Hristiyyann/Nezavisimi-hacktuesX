import classes from './style.module.less';
import { Button, Select, InputNumber } from 'antd';

type FooterProps = {
    loading: boolean;
    disableFilters: boolean;
    handleSearch: () => void;
    setFilters: React.Dispatch<React.SetStateAction<{
        selectedMedia: string[];
        selectedNumberOfArticles: number | null;
    }>>
}

function Footer({ handleSearch, setFilters, disableFilters, loading }: FooterProps) {
    return (
        <div className = {classes.footerContainer}>
        {
            !disableFilters && 
            <div className = {classes.selects}>
                <Select
                    mode = 'multiple'
                    style = {{ width: 220 }}
                    placeholder = 'Изберете медия'
                    onChange = {values => setFilters(prev => ({...prev, selectedMedia: values }))}
                    options = {[
                        { value: 'novini.bg', label: 'novini.bg' },
                        { value: 'frognews.bg', label: 'frognews.bg' },
                        { value: 'pik.bg', label: 'pik.bg' }
                    ]}
                />

                <InputNumber 
                    min = {1} 
                    max = {5}
                    onChange = {value => setFilters(prev => ({...prev, selectedNumberOfArticles: value }))}
                    defaultValue = {1} 
                />
            </div>
        }
            <Button
                disabled = {loading}
                type = 'primary'
                onClick = {handleSearch}
                style = {{ alignSelf: 'flex-end' }}
            >
                Търси
            </Button>
        </div>
    )
}

export default Footer;