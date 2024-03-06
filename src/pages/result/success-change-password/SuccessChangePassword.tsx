import { FC } from 'react';
import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';
import { PATHS } from '@constants/PATHS';

const DATA: AppResultProps = {
    navigateTo: PATHS.auth.path,
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
