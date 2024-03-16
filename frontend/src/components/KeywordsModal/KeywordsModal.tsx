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

function KeywordsModal({ isOpen, onClose }: KeywordsModalProps) {
    const [value, setValue] = useState<string>();
    const { performer, changeLoading } = useRequest({ 
        url: '/api/keyword',
        method: 'post'
    });
    const { performer: deletePerformer } =  useRequest({ 
        url: '/api/keyword',
        method: 'delete'
    });

    const { keywords, setKeywords } = useContext(AppContext);
    
    const handleAddKeyword = async () => {
        if (!value) {
            return onClose();
        }

        const data = await performer<Keyword>({ keyword: value });
        if (!data) return;

        setKeywords(prev => {
            prev.push(data);

            return [...prev];
        });
        setValue(undefined);
    };

    const handleDeleteKeyword = async (keyword: string) => {
        const result = await deletePerformer({ keyword });
        if (!result) return;

        setKeywords(prev => prev.filter(({ name }) => name !== keyword));
    }

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
                
                <div className = 'keywords'>
                {
                    keywords.map(({ name }) => 
                        <Tag
                            key = {name}
                            closable
                            onClose = {() => handleDeleteKeyword(name)}
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