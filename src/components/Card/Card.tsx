import styles from './Card.module.scss';

export const Card = ({ title, btnText, btnIcon }) => (
    <div className={styles.card}>
        <p className={styles.card__title}>{title}</p>
        <button className={styles.card__btn}>
            <span className={styles.card__icon}>{btnIcon}</span>
            <span>{btnText}</span>
        </button>
    </div>
);
