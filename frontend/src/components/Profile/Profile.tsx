import { Avatar, Dropdown } from 'antd';
import classes from './style.module.less';
import { useState } from 'react';
import KeywordsModal from 'components/KeywordsModal/KeywordsModal';

function Profile() {
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalClick = () => setModalOpen(prev => !prev);
    console.log(modalOpen)

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
                    HR
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