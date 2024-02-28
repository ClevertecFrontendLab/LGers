import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

const DATA: AppResultProps = {
    title: 'Вход не выполнен',
    status: 'warning',
    buttonText: 'Повторить',
    navigateTo: '/auth',
    subTitle: 'Что-то пошло не так. Попробуйте еще раз',
    dataTestId: 'login-retry-button',
}

export const ErrorLogin: FC = () => {

    return (
        <AppResult {...DATA} clearError={true}/>
    );
};
