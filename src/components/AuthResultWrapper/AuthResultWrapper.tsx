import s from './AuthResultWrapper.module.scss';
import { FC, JSX } from 'react';
import { Wrapper } from '@components/Wrapper';

type Props = {
    children: JSX.Element;
};

export const AuthResultWrapper: FC<Props> = ({ children }) => {

    return (
        <Wrapper>
            <div
                className={s.result__page}
            >
                <div
                    className={s.resultWrapper}
                >
                    <div
                        className={s.formWrapper}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
