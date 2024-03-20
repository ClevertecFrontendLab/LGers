import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { CalendarTwoTone, HeartFilled, ProfileOutlined } from '@ant-design/icons';
import { AppCardProps } from '@components/Card/Card.types';
import { PATHS } from '@constants/PATHS';
import { trainingsSelector } from '@redux/training/training.slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLazyGetTrainingQuery } from '@redux/api/api';
import { Loader } from '@components/Loader';
import { TrainingsError } from '@components/modals/TrainingsError';
import styles from './MainContent.module.scss';

const descItems = [
    { id: '1', desc: 'С CleverFit ты сможешь:' },
    {
        id: '2',
        desc: '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;',
    },
    {
        id: '3',
        desc: '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
    },
    {
        id: '4',
        desc: '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
    },
    {
        id: '5',
        desc: '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
    },
];

export const MainContent: FC = () => {
    const navigate = useNavigate();
    const [getTrainings] = useLazyGetTrainingQuery();

    const { isFetching, hasError } = useAppSelector(trainingsSelector);

    const onCalendarClick = async () => {
        const trainings = await getTrainings();

        if (trainings.isSuccess) {
            navigate(PATHS.calendar.path);
        }
    };

    const cards: AppCardProps[] = [
        {
            id: 0,
            title: 'Расписать тренировки',
            btnText: 'Тренировки',
            btnIcon: <HeartFilled />,
            link: PATHS.workouts.path,
        },
        {
            id: 1,
            title: 'Назначить календарь',
            btnText: 'Календарь',
            btnIcon: <CalendarTwoTone />,
            link: PATHS.calendar.path,
            dataTestId: 'menu-button-calendar',
            onClick: onCalendarClick,
        },
        {
            id: 2,
            title: 'Заполнить профиль',
            btnText: 'Профиль',
            btnIcon: <ProfileOutlined />,
            link: PATHS.profile.path,
        },
    ];

    return (
        <>
            <section className={styles.mainSection}>
                <div className={styles.mainCard}>
                    <p className={styles.about}>
                        {descItems.map((item) => {
                            return <span key={item.id}>{item.desc}</span>;
                        })}
                    </p>
                </div>
                <div className={styles.mainCard}>
                    <h4 className={styles.description}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </h4>
                </div>
            </section>
            <div className={styles.cards}>
                {cards.map((card) => {
                    return <Card {...card} key={card.id} />;
                })}
            </div>
            <TrainingsError isOpen={hasError} />
            {isFetching && <Loader />}
        </>
    );
};
