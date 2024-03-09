import { FC } from 'react';
import { Button, Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { resetError } from '@redux/feedbacks/feedbacks.slice';

export type FeedbackErrorPostProps = {
    showModal: () => void;
};

export const FeedbackErrorPost: FC<FeedbackErrorPostProps> = ({ showModal }) => {
    const { isPostError } = useAppSelector((state) => state.feedbacks);
    const dispatch = useAppDispatch();
    const handleWriteFeedback = () => {
        dispatch(resetError());
        showModal();
    };

    const handleClose = () => {
        dispatch(resetError());
    };

    return (
        <Modal
            open={isPostError}
            destroyOnClose
            closable={false}
            maskStyle={{ backdropFilter: 'blur(3px)' }}
            centered
            footer={null}
        >
            <Result
                status={'error'}
                title={'Данные не сохранились'}
                subTitle={'Что-то пошло не так. Попробуйте еще раз'}
                extra={[
                    <Button
                        type='primary'
                        onClick={handleWriteFeedback}
                        key='write'
                        data-test-id={'write-review-not-saved-modal'}
                    >
                        Написать отзыв
                    </Button>,
                    <Button type='default' onClick={handleClose} key='close'>
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
