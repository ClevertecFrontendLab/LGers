import { FC } from 'react';
import { AppCardProps } from './Card.types';
import styles from './Card.module.scss';

export const Card: FC<AppCardProps> = ({ title, btnText, btnIcon, link, dataTestId, onClick }) => (
    <div className={styles.card}>
        <p className={styles.card__title}>{title}</p>
        <button className={styles.card__btn} data-test-id={dataTestId} onClick={onClick}>
            <span className={styles.card__icon}>{btnIcon}</span>
            <span>{btnText}</span>
        </button>
    </div>
);
