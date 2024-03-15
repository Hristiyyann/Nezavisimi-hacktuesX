import { Input, Modal, Tag } from "antd";
import AppContext from "contexts/AppContext";
import useRequest from "hooks/useRequest";
import { useContext, useState } from "react";
import { Keyword } from "types";
import classes from './style.module.less';

type KeywordsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

type RequestResponse = {
    success: boolean;
    result: Keyword
}

function KeywordsModal({ isOpen, onClose }: KeywordsModalProps) {
    const [value, setValue] = useState<string>();
    const { performer, changeLoading } = useRequest({ 
        url: '/api/keyword',
        method: 'post'
    });
    const { keywords, setKeywords } = useContext(AppContext);
    
    const handleAddKeyword = async () => {
        const data = await performer({ keyword: value });
        const response = data as RequestResponse;

        setKeywords(prev => {
            prev.push(response.result);

            return [...prev];
        });
        setValue(undefined);
    };

    return (
        <Modal
            open = {isOpen}
            onCancel = {onClose}
            centered
            title = 'Ключови думи'
            cancelButtonProps = {{
                title: 'Затвори'
            }}
            okButtonProps = {{
                title: 'Добави',
                loading: changeLoading,
                onClick: handleAddKeyword
            }}
        >
            <div className = {classes.modalContainer}>
                <Input
                    value = {value}
                    onChange = {event => setValue(event.target.value)}
                    onPressEnter = {handleAddKeyword}
                />
                
                <div className = {classes.keywords}>
                {
                    keywords.map(({ name }) => 
                        <Tag
                            key = {name}
                            closable
                        >
                            {name}
                        </Tag>
                    )
                }
                </div>
            </div>
        </Modal>
    )
}

export default KeywordsModal;