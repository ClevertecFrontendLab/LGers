import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

export const ErrorChekEmail: FC = () => {

    const DATA: AppResultProps = {
        navigateTo: '/auth/confirm-email',
        title: 'Что-то пошло не так',
        status: '500',
        subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        buttonText: 'Назад',
        dataTestId: 'check-back-button',
    }

    return (
        <AppResult {...DATA} />
    );
};
