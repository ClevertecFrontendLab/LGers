import { FC, Ref, createRef, useState } from 'react';
import type { Moment } from 'moment';
import { CarouselRef } from 'antd/lib/carousel';
import { TrainingsCard } from './components/TrainingsCard';
import { AddTrainingsCard } from './components/AddTrainingsCard';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setSelectedTrainee } from '@redux/training/training.slice';

type CalendarPopoverProps = {
    date: Moment;
    isCurrentMonth: boolean;
    value?: Moment;
    children?: JSX.Element | JSX.Element[] | boolean;
    showDrawer?: () => void;
    open?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const CalendarPopover2: FC<CalendarPopoverProps> = ({ date, value, open, onClose }) => {
    const dispatch = useAppDispatch();
    const weekDay = date.isoWeekday();
    const carouselRef: Ref<CarouselRef> = createRef();
    const [isAddTrainee, setIsAddTrainee] = useState(true);

    const onAddTrainee = () => {
        carouselRef.current?.goTo(1);
        setIsAddTrainee(!isAddTrainee);
    };

    const onBack = () => {
        carouselRef.current?.goTo(0);
        setIsAddTrainee(!isAddTrainee);
        dispatch(setSelectedTrainee(undefined));
    };

    const weekStylesBase: React.CSSProperties = {
        width: 264,
        position: 'absolute',
        zIndex: 1000,
        alignContent: 'left',
        top: 2,
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
    };

    const weekStyles: React.CSSProperties =
        weekDay === 5 || weekDay === 6
            ? {
                  ...weekStylesBase,
                  right: 3,
              }
            : {
                  ...weekStylesBase,
                  left: 3,
              };

    return (
        <div style={weekStyles}>
            {isAddTrainee ? (
                <TrainingsCard date={date} onAddTrainee={onAddTrainee} onClose={onClose} />
            ) : (
                <AddTrainingsCard date={date} onBack={onBack} onAddTrainee={onAddTrainee} />
            )}
        </div>
    );
};
