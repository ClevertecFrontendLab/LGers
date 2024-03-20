import { FC, useEffect, useState } from 'react';
import { AppWrapper } from '@components/AppWrapper';
import { Badge, BadgeProps, Calendar, Modal, Popover, Tooltip } from 'antd';
import { useGetTrainingListQuery } from '@redux/api/api';
import {
    resetTrainingError,
    setCurrentTrainings,
    setSelectedDate,
    setSelectedTrainee,
    trainingsSelector,
} from '@redux/training/training.slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CloseOutlined } from '@ant-design/icons';
import { getDate, getListData } from '../../utils/CalendarPage.utils';
import { appLocale } from './CalendarPage.locale';
import moment from 'moment';
import type { Moment } from 'moment';
import { CalendarPopover2 } from '@components/CalendarPopover';
import { AppDrawer } from '@components/AppDrawer';

moment.locale('ru');
moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();
    const { refetch } = useGetTrainingListQuery();
    const { trainings, hasError, selectedDate } = useAppSelector(trainingsSelector);
    const [selectedValue, setSelectedValue] = useState(() => moment());
    const [open, setOpen] = useState(false);

    const onClose = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(false);
    };

    const onOpen = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(setSelectedTrainee(undefined));
    }, [selectedDate, dispatch]);

    const onSelect = (newValue: Moment) => {
        const currentDate = newValue.format('YYYY-MM-DD');
        const currentTrainings = trainings.filter((item) => getDate(item.date) === currentDate);

        setSelectedValue(newValue);
        dispatch(setSelectedDate(newValue.format()));
        dispatch(setCurrentTrainings(currentTrainings));
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
            <div
                style={{
                    position: 'relative',
                }}
            >
                <ul>
                    {listData.map((item) => (
                        <li key={item.id}>
                            <Badge status={item.type as BadgeProps['status']} text={item.content} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const dateFullCellRender = (value: Moment) => {
        const isSelectedDate = value.format('YYYYMMDD') === selectedValue.format('YYYYMMDD');

        return (
            <div className='date-cell' onClick={onOpen}>
                {isSelectedDate && open && (
                    <CalendarPopover2 date={value} isCurrentMonth={false} onClose={onClose} />
                )}
                <div
                    className='ant-picker-cell-inner ant-picker-calendar-date'
                    // style={{ zIndex: 0 }}
                >
                    <div className='ant-picker-calendar-date-value'>
                        {moment(value).format('DD')}
                    </div>
                    <div className='ant-picker-calendar-date-content'>{dateCellRender(value)}</div>
                </div>
            </div>
        );
    };

    return (
        <AppWrapper>
            <Calendar
                // onPanelChange={onPanelChange}
                onSelect={onSelect}
                locale={appLocale}
                dateFullCellRender={dateFullCellRender}
            />
            <AppDrawer />
        </AppWrapper>
    );
};
