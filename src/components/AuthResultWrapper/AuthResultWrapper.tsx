import styles from './AuthResultWrapper.module.scss';
import { FC, JSX } from 'react';
import { Wrapper } from '@components/Wrapper';

type Props = {
    children: JSX.Element;
};

export const AuthResultWrapper: FC<Props> = ({ children }) => {

    return (
        <Wrapper>
            <div
                className={styles.result__page}
            >
                <div
                    className={styles.resultWrapper}
                >
                    <div
                        className={styles.formWrapper}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
