import { FC } from 'react';
import { Button, Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeShowSuccess } from '@redux/feedbacks/feedbacks.slice';

export const FeedbackSuccess: FC = () => {
    const { isShowSuccess } = useAppSelector((state) => state.feedbacks);
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
                    <Button type="primary" onClick={() => dispatch(closeShowSuccess())} block>
                        Отлично
                    </Button>,
                ]}
            />
        </Modal>
    );
};
