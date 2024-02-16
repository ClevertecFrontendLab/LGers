import s from './MainContent.module.scss';
import { Card } from '@components/Card';
import { CalendarTwoTone, HeartFilled, ProfileOutlined } from '@ant-design/icons';

const descItems = [
    { id: '1', desc: 'С CleverFit ты сможешь:' },
    {
        id: '2',
        desc: '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;'
    },
    {
        id: '3',
        desc: '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;'
    },
    {
        id: '4',
        desc: '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;'
    },
    {
        id: '5',
        desc: '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.'
    },
];

const cards = [
    {
        key: 0,
        title: 'Расписать тренировки',
        btnText: 'Тренировки',
        btnIcon: <HeartFilled />
    },
    {
        key: 1,
        title: 'Назначить календарь',
        btnText: 'Календарь',
        btnIcon: <CalendarTwoTone />,
    },
    {
        key: 2,
        title: 'Заполнить профиль',
        btnText: 'Профиль',
        btnIcon: <ProfileOutlined />,
    },
];

export const MainContent = () => {
    return (
        <>
            <section className={s.mainSection}>
                <div className={s.mainCard}>
                    <p className={s.about}>
                        {descItems.map((item) => {
                            return (
                                <span key={item.id}>{item.desc}</span>
                            );
                        })
                        }
                    </p>
                </div>
                <div className={s.mainCard}>
                    <h4 className={s.description}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не
                        откладывай на завтра — начни тренироваться уже сегодня!
                    </h4>
                </div>
            </section>
            <div className={s.cards}>
                {cards.map((card) => {
                    return <Card {...card} />
                })}
            </div>
        </>
    );
};
