import { FC, JSX } from 'react';
import s from './FormWrapper.module.scss';

type Props = {
    children: JSX.Element;
};

export const FormWrapper: FC<Props> = ({ children }) => {

    return (
        <div className={s.formWrapper}>
            {children}
        </div>
    );
};
