import { FC } from 'react';
import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';
import { PATHS } from '@constants/PATHS';

const DATA: AppResultProps = {
    navigateTo: PATHS.auth.path,
    title: 'Регистрация успешна',
    status: 'success',
    subTitle: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
    buttonText: 'Войти',
    dataTestId: 'registration-enter-button',
}

export const Success: FC = () => {

    return (
        <AppResult {...DATA} />
    );
};
