import s from './EmailLabel.module.scss';
import { FC } from 'react';

export const EmailLabel: FC = () => {

    return (
        <>
            <span className={s.emailLabel}>e-mail:</span>
        </>
    );
};
