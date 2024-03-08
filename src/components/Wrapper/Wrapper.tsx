import styles from './Wrapper.module.css';
import { FC, JSX } from 'react';

type WrapperProps = {
    children: JSX.Element | JSX.Element[];
}

export const Wrapper: FC<WrapperProps> = ({ children }) =>
    <div className={styles.wrapper}>
        {children}
    </div>
