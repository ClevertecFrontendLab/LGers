import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Space, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setSelectedTrainee, trainingsSelector } from '@redux/training/training.slice';
import { getDate, getExerciseType } from '@utils/CalendarPage.utils';
import { TrainingBadge } from '../TrainingBadge/TrainingBadge';
import { Training } from '@redux/training/training.types';

type TrainingsCardProps = {
    date: Moment;
    onAddTrainee: () => void;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const TrainingsCard: FC<TrainingsCardProps> = ({ date, onClose, onAddTrainee }) => {
    const dispatch = useAppDispatch();
    const buttonTitle1 = 'Создать тренировку';
    const buttonTitle2 = 'Добавить тренировку';
    const disabled = +date.format('YYYYMMDD') <= +moment().format('YYYYMMDD');

    const { trainings } = useAppSelector(trainingsSelector);

    const currentDate = date.format('YYYY-MM-DD');
    const currentTrainings = trainings.filter((item) => getDate(item.date) === currentDate);
    const buttonTitle = buttonTitle1;

    const onEditTrainee = (item: Training) => {
        onAddTrainee();
        dispatch(setSelectedTrainee(item));
    };

    return (
        <Card size='small' title={null} data-test-id='modal-create-training'>
            <Card.Grid
                style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px 12px',
                }}
                hoverable={false}
            >
                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography.Title level={5} style={{ margin: 0, fontWeight: 700 }}>
                        Тренировки на {date?.format('DD.MM.YYYY')}
                    </Typography.Title>
                    <Button
                        type='text'
                        icon={<CloseOutlined />}
                        size={'small'}
                        onClick={onClose}
                        data-test-id='modal-create-training-button-close'
                    />
                </Space>
                <Space direction='vertical' style={{ display: 'flex', width: '100%' }}>
                    {!currentTrainings.length && (
                        <Typography.Text
                            type='secondary'
                            style={{ fontWeight: 400, textAlign: 'left' }}
                        >
                            Нет активных тренировок
                        </Typography.Text>
                    )}
                    <Space direction='vertical' style={{ display: 'flex', width: '100%' }}>
                        {!currentTrainings.length ? (
                            <Empty
                                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                imageStyle={{
                                    height: 32,
                                }}
                                style={{
                                    padding: 16,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                description={false}
                            />
                        ) : (
                            <ul style={{ listStyleType: 'none', margin: '16px 0' }}>
                                {currentTrainings.map((item) => {
                                    const status = getExerciseType(item.name);
                                    return (
                                        <li key={item._id}>
                                            <TrainingBadge
                                                id={item._id}
                                                status={status}
                                                text={item.name}
                                                disabled={item.isImplementation}
                                                onEditClick={() => onEditTrainee(item)}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Space>
                </Space>
            </Card.Grid>
            <Card.Grid style={{ width: '100%', padding: 12 }}>
                <Button
                    type={'primary'}
                    key='button'
                    block
                    disabled={disabled}
                    onClick={onAddTrainee}
                >
                    {buttonTitle}
                </Button>
            </Card.Grid>
        </Card>
    );
};
