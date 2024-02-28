import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

const DATA: AppResultProps = {
    navigateTo: '/auth/change-password',
    title: 'Данные не сохранились',
    status: 'error',
    subTitle: 'Что-то пошло не так. Попробуйте еще раз',
    buttonText: 'Повторить',
    dataTestId: 'change-retry-button',
}

export const ErrorChangePassword: FC = () => {

    return (
        <AppResult {...DATA} />
    );
};
