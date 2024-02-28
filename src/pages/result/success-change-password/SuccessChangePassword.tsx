import { FC } from 'react';
import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

const DATA: AppResultProps = {
    navigateTo: '/auth',
    title: 'Пароль успешно изменен',
    status: 'success',
    subTitle: 'Теперь можно войти в аккаунт исплльзуя свой логин и новый пароль',
    buttonText: 'Вход',
    dataTestId: 'change-entry-button',
}

export const SuccessChangePassword: FC = () => {

    return (
        <AppResult {...DATA} />
    );
};
