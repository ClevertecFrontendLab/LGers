export type Path = {
    path: string;
    title: string;
};

export const PATHS: Record<string, Path> = {
    home: { path: '/', title: 'Главная' },
    root: { path: '/', title: 'Главная' },
    main: { path: '/main', title: 'Главная' },
    auth: { path: '/auth', title: 'Авторизация' },
    authRegistration: { path: '/auth/registration', title: 'Регистрация' },
    authConfirmEmail: { path: '/auth/confirm-email', title: 'Подтвердите email' },
    authChangePassword: {
        path: '/auth/change-password',
        title: 'Восстановление аккаунта',
    },
    feedbacks: { path: '/feedbacks', title: 'Отзывы пользователей' },
};

const result = '/result';

export const PATHS_RESULT = {
    success: `${result}/success`,
    error: `${result}/error`,
    errorLogin: `${result}/error-login`,
    errorUserExist: `${result}/error-user-exist`,
    errorCheckEmail: `${result}/error-check-email`,
    errorCheckEmailNoExist: `${result}/error-check-email-no-exist`,
    errorChangePassword: `${result}/error-change-password`,
    successChangePassword: `${result}/success-change-password`,
};
