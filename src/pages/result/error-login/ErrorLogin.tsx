import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';
import { PATHS } from '@constants/PATHS';

const DATA: AppResultProps = {
    title: 'Вход не выполнен',
    status: 'warning',
    buttonText: 'Повторить',
    navigateTo: PATHS.auth.path,
    subTitle: 'Что-то пошло не так. Попробуйте еще раз',
    dataTestId: 'login-retry-button',
}

export const ErrorLogin: FC = () => {

    return (
        <AppResult {...DATA} clearError={true}/>
    );
};
