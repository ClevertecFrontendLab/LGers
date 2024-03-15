import { FC, useEffect } from 'react';
import { AppWrapper } from '@components/AppWrapper';
import { Badge, BadgeProps, Calendar, Modal } from 'antd';
import { useGetTrainingListQuery } from '@redux/api/api';
import { resetTrainingError, trainingsSelector } from '@redux/training/training.slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CloseOutlined } from '@ant-design/icons';
import { getDate, getListData } from './CalendarPage.utils';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { appLocale } from './CalendarPage.locale';
import moment from 'moment';
import type { Moment } from 'moment';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();
    const { refetch } = useGetTrainingListQuery();
    const { trainings, hasError } = useAppSelector(trainingsSelector);
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
        console.log(value.format('MM'), mode);
    };

    const info = () => {
        Modal.info({
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При открытии данных произошла ошибка
                </span>
            ),
            content: <p data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</p>,
            okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
            onOk() {
                refetch();
                Modal.destroyAll();
                dispatch(resetTrainingError());
            },
            onCancel() {
                Modal.destroyAll();
                dispatch(resetTrainingError());
            },
            closable: true,
            maskStyle: { backdropFilter: 'blur(3px)' },
            centered: true,
            closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
        });
    };

    useEffect(() => {
        if (hasError) {
            info();
        }
    }, [hasError]);

    const dateCellRender = (value: Moment) => {
        const currentDate = value.format('YYYY-MM-DD');
        const currentTrainings = trainings.filter((item) => getDate(item.date) === currentDate);
        const listData = getListData({ trainings: currentTrainings });

        return (
            <ul>
                {listData.map((item) => (
                    <li key={item.id}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <AppWrapper>
            <Calendar
                dateCellRender={dateCellRender}
                onPanelChange={onPanelChange}
                locale={appLocale}
            />
        </AppWrapper>
    );
};
