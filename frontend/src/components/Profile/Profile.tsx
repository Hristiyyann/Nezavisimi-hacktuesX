import { Avatar, Dropdown } from 'antd';
import KeywordsModal from 'components/KeywordsModal/KeywordsModal';
import AppContext from 'contexts/AppContext';
import { useContext, useMemo, useState } from 'react';
import classes from './style.module.less';
import { useNavigate } from 'react-router';

function Profile() {
    const { userName, setAccessToken } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleModalClick = () => setModalOpen(prev => !prev);

    const initials = useMemo(() => {
        if (!userName) return 'UU';

        const splittedName = userName.split(' ');

        return splittedName[0][0].toUpperCase() + splittedName[1][0].toUpperCase();
    }, [userName]);

    const logOut = () => {
        setAccessToken(null);
        window.localStorage.removeItem('accessToken');
        navigate('/sign-in');
    }

    return (
        <>
            <Dropdown
                trigger = {['click']}
                className = {classes.profileDropdown}
                menu = {{ 
                    items: [
                        { 
                            key: 'keywords', 
                            label: 'Ключови думи',
                            onClick: handleModalClick
                        },
                        { 
                            key: 'logout', 
                            label: 'Изход',
                            onClick: logOut
                        }
                    ] 
                }}
            >
                <Avatar
                    size = {50}
                    className = {classes.avatar}
                    style = {{ background: '#D9D9D9' }}
                >
                    {initials}
                </Avatar>
            </Dropdown>

            <KeywordsModal
                isOpen = {modalOpen}
                onClose = {handleModalClick}
            />
        </>
    )
}

export default Profile;