import styles from './Wrapper.module.css';
import { FC, JSX } from 'react';

interface WrapperProps {
     children: JSX.Element;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};
