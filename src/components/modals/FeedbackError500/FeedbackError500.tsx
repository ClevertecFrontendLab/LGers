import { FC, useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { resetError } from '@redux/feedbacks/feedbacks.slice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/PATHS';

export const FeedbackError500: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { error } = useAppSelector((state) => state.feedbacks);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(resetError());
        navigate(PATHS.auth.path);
    };

    useEffect(() => {
        if (error?.status === 403 || error?.status === 500) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [error]);

    return (
        <Modal
            open={isOpen}
            destroyOnClose
            closable={false}
            maskStyle={{ backdropFilter: 'blur(3px)' }}
            centered
            footer={null}
        >
            <Result
                status={'500'}
                title={'Что-то пошло не так'}
                subTitle={'Произошла ошибка, Попробуйте еще раз'}
                extra={[
                    <Button type="primary" onClick={handleClose} key='back'>
                        Назад
                    </Button>,
                ]}
            />
        </Modal>
    );
};
