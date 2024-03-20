import { FC, useState } from 'react';
import { Button, Modal, Input, Space } from 'antd';
import { useAddFeedbackMutation, useLazyGetFeedbacksQuery } from '@redux/api/api';
import { AppRate } from '@components/AppRate/AppRate';
import styles from './AddFeedback.module.scss';

export type AddFeedbackProps = {
    showModal: boolean;
    handleClose: () => void;
};

export const AddFeedback: FC<AddFeedbackProps> = ({ showModal, handleClose }) => {
    const initialState = { rating: 0, message: '' };
    const [state, setState] = useState(initialState);

    const onRateChange = (value: number) => {
        setState((prev) => ({ ...prev, rating: value }));
    };

    const onMessageChange = (value: string) => {
        setState((prev) => ({ ...prev, message: value }));
    };

    const [addFeedback] = useAddFeedbackMutation();
    const [getFeedbacks] = useLazyGetFeedbacksQuery();

    const handleOk = async () => {
        await addFeedback({ rating: state.rating, message: state.message });
        await getFeedbacks(null);
        handleClose();
    };

    return (
        <Modal
            title='Ваш отзыв'
            open={showModal}
            okText={'Опубликовать'}
            okButtonProps={{
                disabled: !state.rating,
                datatype: 'new-review-submit-button',
            }}
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={handleClose}
            style={{ padding: 0 }}
            wrapClassName={styles.wrapper}
            maskStyle={{ backdropFilter: 'blur(3px)' }}
            centered
            footer={[
                <Button
                    type='primary'
                    onClick={handleOk}
                    disabled={!state.rating}
                    data-test-id='new-review-submit-button'
                    key='add'
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Space direction='vertical' style={{ display: 'flex' }}>
                <AppRate onChange={onRateChange} value={state.rating} />
                <Input.TextArea
                    // rows={3}
                    autoSize={{ minRows: 3 }}
                    onChange={(e) => onMessageChange(e.target.value)}
                    style={{ resize: 'both' }}
                />
            </Space>
        </Modal>
    );
};
