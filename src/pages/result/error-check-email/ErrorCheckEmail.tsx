import { FC } from 'react';
import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';
import { PATHS } from '@constants/PATHS';

export const ErrorCheckEmail: FC = () => {
    const DATA: AppResultProps = {
        navigateTo: PATHS.authConfirmEmail.path,
        title: 'Что-то пошло не так',
        status: '500',
        subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        buttonText: 'Назад',
        dataTestId: 'check-back-button',
    };

    return <AppResult {...DATA} navigateTo={-1} />;
};
