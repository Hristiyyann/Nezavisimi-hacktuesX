import { Avatar, Dropdown } from 'antd';
import classes from './style.module.less';
import { useContext, useMemo, useState } from 'react';
import KeywordsModal from 'components/KeywordsModal/KeywordsModal';
import AppContext from 'contexts/AppContext';

function Profile() {
    const { userName } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalClick = () => setModalOpen(prev => !prev);

    const initials = useMemo(() => {
        if (!userName) return 'UU';

        const splittedName = userName.split(' ');

        return splittedName[0][0].toUpperCase() + splittedName[1][0].toUpperCase();
    }, [userName]);

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
                        }
                    ] 
                }}
            >
                <Avatar
                    size = {50}
                    className = {classes.avatar}
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