import styles from './AuthWrapper.module.scss';
import { FC, JSX } from 'react';

type Props = {
    children: JSX.Element;
};

export const AuthWrapper: FC<Props> = ({ children }) => {

    return (
        <div className={styles.authWrapper}>
            {children}
        </div>
    );
};
