import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

const DATA: AppResultProps = {
    navigateTo: '/auth/registration',
    title: 'Данные не сохранились',
    status: 'error',
    subTitle: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
    buttonText: 'Назад к регистрации',
    dataTestId: 'registration-back-button',
}

export const ErrorUserExist: FC = () => {

    return (
        <AppResult {...DATA} />
    );
};
