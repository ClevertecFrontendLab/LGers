import { FC } from 'react';
import { Button, Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeShowSuccess, feedbacksSelector } from '@redux/feedbacks/feedbacks.slice';

export const FeedbackSuccess: FC = () => {
    const { isShowSuccess } = useAppSelector(feedbacksSelector);
    const dispatch = useAppDispatch();

    return (
        <Modal
            open={isShowSuccess}
            destroyOnClose
            closable={false}
            maskStyle={{ backdropFilter: 'blur(3px)' }}
            centered
            footer={null}
        >
            <Result
                status={'success'}
                title={'Отзыв успешно опубликован'}
                extra={[
                    <Button
                        type='primary'
                        onClick={() => dispatch(closeShowSuccess())}
                        block
                        key={'closeButton'}
                    >
                        Отлично
                    </Button>,
                ]}
            />
        </Modal>
    );
};
