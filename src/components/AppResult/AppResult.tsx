import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetError, resetHasResult } from '@redux/auth/auth.slice';
import { AuthResultWrapper } from '@components/AuthResultWrapper';
import { Button, Result } from 'antd';
import styles from './AppResult.module.scss';

export interface AppResultProps {
    title: string;
    buttonText: string;
    navigateTo: string | number;
    dataTestId: string;
    status?: | 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
    subTitle?: string;
    clearError?: boolean;
}

export const AppResult: FC<AppResultProps> = (
    {
        navigateTo,
        status = 'info',
        title,
        buttonText,
        subTitle,
        clearError,
        dataTestId,
    }
) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    clearError && dispatch(resetError());

    const handleClick = () => {
        dispatch(resetHasResult());
        navigate(navigateTo);
    }

    return (
        <AuthResultWrapper>
            <Result
                className={styles.resultWrapper}
                status={status}
                title={
                    <h3 className={styles.resultWrapper__title}>
                        {title}
                    </h3>
                }
                subTitle={
                    <span className={styles.resultWrapper__subTitle}>
                        {subTitle}
                    </span>
                }
                extra={
                    <Button
                        type="primary"
                        size={'large'}
                        key="console"
                        block
                        onClick={handleClick}
                        data-test-id={dataTestId}
                    >
                        {buttonText}
                    </Button>
                }
            />
        </AuthResultWrapper>
    );
};
