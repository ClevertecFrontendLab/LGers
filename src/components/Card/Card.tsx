import s from './Card.module.scss';

export const Card = ({ title, btnText, btnIcon }) => {

    return (
        <div className={s.card}>
            <p className={s.card__title}>{title}</p>
            <button className={s.card__btn}>
                <span className={s.card__icon}>{btnIcon}</span>
                <span>{btnText}</span>
            </button>
        </div>
    );
};
