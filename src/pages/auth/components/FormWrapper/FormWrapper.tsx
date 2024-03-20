import { FC, JSX } from 'react';
import styles from './FormWrapper.module.scss';

type Props = {
    children: JSX.Element;
};

export const FormWrapper: FC<Props> = ({ children }) => (
    <div className={styles.formWrapper}>{children}</div>
);
