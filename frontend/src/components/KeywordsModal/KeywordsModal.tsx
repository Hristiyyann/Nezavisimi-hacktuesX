import { Input, Modal, Tag } from "antd";
import { useState } from "react";
import classes from './style.module.less';

type KeywordsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

function KeywordsModal({ isOpen, onClose }: KeywordsModalProps) {
    const [currentKeywords, setCurrentKeywords] = useState<string[]>(['dld', 'kdps', 'dld', 'kdps', 'dld', 'kdps', 'dld', 'kdps', 'dld', 'kdps', 'dld', 'kdps']);

    return (
        <Modal
            open = {isOpen}
            onCancel = {onClose}
            centered
            title = 'Ключови думи'
        >
            <div className = {classes.modalContainer}>
                <Input/>
                
                <div className = {classes.keywords}>
                {
                    currentKeywords.map((keyword) => 
                        <Tag
                            key = {keyword}
                            closable
                        >
                            {keyword}
                        </Tag>
                    )
                }
                </div>
            </div>
        </Modal>
    )
}

export default KeywordsModal;