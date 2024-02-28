import { FC } from 'react';
import { AppResult } from '@components/AppResult';
import { AppResultProps } from '@components/AppResult/AppResult';

interface Props {
    navigateTo: string;
}

export const Error: FC<Props> = ({ navigateTo }) => {

    const DATA: AppResultProps = {
        title: 'Данные не сохранились',
        status: 'error',
        buttonText: 'Повторить',
        navigateTo,
        subTitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        dataTestId: 'registration-retry-button',
    }

    return (
        <AppResult {...DATA}/>
    );
};
