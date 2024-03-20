import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerFormItem } from '@components/DrawerFormItem';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getExerciseType, getUpdatedTrainings } from '@utils/CalendarPage.utils';
import {
    setSelectedTrainee,
    setTrainings,
    toggleDrawer,
    trainingsSelector,
} from '@redux/training/training.slice';
import {
    Badge,
    Button,
    Drawer,
    Form,
    Space,
    Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FC, ReactNode, useEffect, useState } from 'react';
import moment from 'moment';
import { Training } from '@redux/training/training.types';


export const AppDrawer: FC = () => {
    const dispatch = useAppDispatch();
    const [isFormChanged, setIsFormChanged] = useState(false);
    const { isAddTrainee, selectedDate, selectedTrainee, trainings } =
        useAppSelector(trainingsSelector);
    const initialValues =
        selectedTrainee?.exercises && selectedTrainee?.exercises.length
            ? { exercises: selectedTrainee?.exercises }
            : { exercises: [{ name: '', approaches: 1 }] };

    const [form] = useForm();

    const onClose = () => {
        if (isFormChanged) {
            const exercises = form.getFieldsValue();
            if (selectedTrainee) {
                const updatedTrainee: Training = {
                    ...selectedTrainee,
                    exercises: exercises.exercises,
                    isUpdated: true,
                };
                const isNew = !selectedTrainee._id;
                const isUpdated = selectedTrainee.isUpdated;

                if (isNew && isUpdated) {
                    const upd = getUpdatedTrainings({
                        previousTrainings: trainings,
                        updatedTraining: updatedTrainee,
                    });
                    dispatch(setTrainings(upd));
                } else {
                    const newTraining: Training = {
                        ...selectedTrainee,
                        exercises: exercises.exercises,
                        isUpdated: true,
                    };

                    const upd = [...trainings, newTraining];
                    dispatch(setTrainings(upd));
                }

                dispatch(setSelectedTrainee(updatedTrainee));
            }
        }
        form.resetFields();

        dispatch(toggleDrawer());
        setIsFormChanged(false);
    };

    const onFormChange = () => {
        if (!isFormChanged) {
            setIsFormChanged(true);
        }
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const header: ReactNode = (
        <Space align='center' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Title level={5}>
                <PlusOutlined />
                <span> Добавление упражнений</span>
            </Typography.Title>
            <Button type='text' onClick={onClose} data-test-id='modal-drawer-right-button-close'>
                <CloseOutlined />
            </Button>
        </Space>
    );

    return (
        <div>
            <Drawer
                title={null}
                placement='right'
                onClose={onClose}
                open={isAddTrainee}
                closable={false}
                data-test-id='modal-drawer-right'
            >
                {header}
                <Space align='center' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography.Text disabled>
                        <Badge
                            status={getExerciseType(selectedTrainee?.name)}
                            text={selectedTrainee?.name}
                            style={{ color: 'rgb(140, 140, 140)' }}
                        ></Badge>
                    </Typography.Text>
                    <Typography.Text disabled>
                        {moment(selectedDate).format('DD.MM.YYYY')}
                    </Typography.Text>
                </Space>
                <Form
                    form={form}
                    name='dynamic_form_nest_item'
                    autoComplete='off'
                    onFieldsChange={onFormChange}
                    initialValues={initialValues}
                    fields={[{ name: 'name' }]}
                >
                    <Form.Item>
                        <DrawerFormItem id={selectedTrainee?._id} />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};
