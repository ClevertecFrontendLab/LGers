import { FC, JSX } from 'react';
import styles from './AuthWrapper.module.scss';

type Props = {
    children: JSX.Element;
};

export const AuthWrapper: FC<Props> = ({ children }) =>
    <div className={styles.authWrapper}>
        {children}
    </div>
