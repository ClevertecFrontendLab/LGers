import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

const DATA: AppResultProps = {
    navigateTo: '/auth',
    title: 'Такой e-mail не зарегистрирован',
    status: 'error',
    subTitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
    buttonText: 'Попробовать снова',
    dataTestId: 'check-retry-button',
}

export const ErrorCheckEmailNoExist: FC = () => {

    return (
        <AppResult {...DATA} />
    );
};
