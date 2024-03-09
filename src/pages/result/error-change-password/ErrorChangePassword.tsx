import { FC } from 'react';

import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';
import { PATHS } from '@constants/PATHS';

const DATA: AppResultProps = {
    navigateTo: PATHS.authChangePassword.path,
    title: 'Данные не сохранились',
    status: 'error',
    subTitle: 'Что-то пошло не так. Попробуйте еще раз',
    buttonText: 'Повторить',
    dataTestId: 'change-retry-button',
};

export const ErrorChangePassword: FC = () => {
    return <AppResult {...DATA} />;
};
