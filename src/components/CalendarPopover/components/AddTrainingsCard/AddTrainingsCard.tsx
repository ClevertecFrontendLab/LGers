import { FC, useState } from 'react';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Cascader, Empty, Select, Space, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setCurrentTrainings,
    setSelectedTrainee,
    toggleDrawer,
    trainingsSelector,
} from '@redux/training/training.slice';
import {
    getCurrentTrainings,
    getIsUpdatedTraining,
    getTraineeOptions,
} from '@utils/CalendarPage.utils';
import { Training } from '@redux/training/training.types';

type AddTrainingsCardProps = {
    date: Moment;
    // isCurrentMonth: boolean;
    // value?: Moment;
    // children?: JSX.Element | JSX.Element[] | boolean;
    // open?: boolean;
    onBack: () => void;
    showDrawer?: () => void;
    onAddTrainee?: () => void;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    // value?: string;
};

type Option = {
    value: string | number;
    label: string;
    children?: Option[];
    key?: string | number;
};

export const AddTrainingsCard: FC<AddTrainingsCardProps> = ({
    date,
    onClose,
    onAddTrainee,
    onBack,
    showDrawer,
}) => {
    // console.log('TrainingsCard', value);
    // const buttonTitle1 = 'Создать тренировку';
    // const buttonTitle2 = 'Добавить тренировку';
    const dispatch = useAppDispatch();
    // const disabled = +date.format('YYYYMMDD') <= +moment().format('YYYYMMDD');
    // const [selectedTrainee1, setSelectedTrainee1] = useState<string[] | undefined>(undefined);
    const {
        trainings,
        hasError,
        trainingList,
        selectedTrainee,
        currentTrainings,
        selectedDate,
        updatedTrainings,
    } = useAppSelector(trainingsSelector);
    const [opeDrawer, setOpeDrawer] = useState(false);

    const options1: Option[] = trainingList.map((item) => {
        return { value: item.name, label: item.name };
    });

    const isUpdatedTraining = getIsUpdatedTraining({
        selectedTraining: selectedTrainee,
        updatedTrainings,
    });
    const currentTrainings2 = getCurrentTrainings({
        trainings,
        date: selectedDate,
        updatedTrainings,
    });
    const options: Option[] = getTraineeOptions({ currentTrainings, trainingList });

    const placeholder = selectedTrainee ? selectedTrainee.name : 'Выбор типа тренировки';

    const newTraining: Training = {
        date: moment(selectedDate).format(),
        exercises: [],
        isImplementation: false,
        name: '',
        // parameters: []
    };
    const onChange = (value: string[]) => {
        // setSelectedTrainee1(value);
        // dispatch(setSelectedTrainee(value));
        dispatch(setSelectedTrainee({ ...newTraining, name: value }));
        dispatch(setCurrentTrainings({ ...currentTrainings }));
        console.log('setSelectedTrainee', value);
    };

    const onAddTrainee2 = () => {
        if (onAddTrainee) {
            // onAddTrainee();
        }
        dispatch(toggleDrawer());
        // showDrawer();
    };
    return (
        <Card
            bordered={false}
            bodyStyle={{
                padding: 0,
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
            data-test-id='modal-create-exercise'
        >
            <Space
                align='center'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 400,
                    padding: 12,
                    margin: 0,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    width: '100%',
                    // height: '100%',
                    // padding: 0
                    // letterSpacing: '0.5px',
                }}
                size={0}
            >
                <Button
                    type='text'
                    icon={<ArrowLeftOutlined />}
                    size={'small'}
                    onClick={onBack}
                    data-test-id='modal-exercise-training-button-close'
                />
                <Select
                    options={options}
                    onChange={onChange}
                    placeholder={<Typography.Text>{placeholder}</Typography.Text>}
                    size='small'
                    style={{
                        // width: 194,
                        width: 214,
                        // width: '100%',
                        minWidth: '100%',
                        textAlign: 'left',
                        // flex: 1,
                    }}
                    maxTagCount='responsive'
                    bordered={false}
                    data-test-id='modal-create-exercise-select'
                />
            </Space>
            <Space
                direction='vertical'
                style={{
                    padding: 12,
                    display: 'flex',
                    flex: 1,
                    // height: '100%',
                }}
            >
                <Space style={{ display: 'flex', flex: 1, height: '100%' }}>
                    {/* <div onClick={onAddTrainee2}>add traine</div> */}
                    {selectedTrainee?.exercises.map((item) => (
                        <div onClick={onAddTrainee2} key={item._id}>
                            {item.name}
                        </div>
                    ))}
                </Space>
                <Button
                    // type={'default'}
                    key='button1'
                    block
                    disabled={!selectedTrainee}
                    onClick={onAddTrainee2}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type={'text'}
                    key='button2'
                    block
                    // disabled={!selectedTrainee}
                    disabled={!selectedTrainee?.isUpdated}
                    onClick={onBack}
                >
                    Сохранить
                </Button>
            </Space>
        </Card>
    );
};
