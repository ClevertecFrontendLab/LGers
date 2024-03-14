import { FC } from 'react';
import { Button, Modal, Result } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetTrainingError } from '@redux/training/training.slice';

export type TrainingsErrorProps = {
    isOpen?: boolean;
};

export const TrainingsError: FC<TrainingsErrorProps> = ({ isOpen }) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(resetTrainingError());
    };

    return (
        <Modal open={isOpen} destroyOnClose closable={false} mask={false} centered footer={null}>
            <div data-test-id='modal-no-review'>
                <Result
                    status={'500'}
                    title={'Что-то пошло не так'}
                    subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                    data-test-id='modal-no-review'
                    extra={
                        <Button type='primary' onClick={handleClose}>
                            Назад
                        </Button>
                    }
                />
            </div>
        </Modal>
    );
};
