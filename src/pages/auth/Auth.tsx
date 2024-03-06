import { FC, useEffect, useState } from 'react';
import { Wrapper } from '@components/Wrapper';
import { Button, Checkbox, Form, Input } from 'antd';
import { AuthWrapper } from '@components/AuthWrapper';
import { FormWrapper } from '@pages/auth/components/FormWrapper';
import { Logo } from '@pages/auth/components/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthTabs } from '@pages/auth/components/AuthTabs';
import {
    CheckEmailResponse,
    cleverFitApi,
    FormValues,
    useCheckEmailMutation,
} from '@redux/api/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';
import { resetError, setAuth, setAuthError, setCredentials, setRememberMe, setToken } from '@redux/auth/auth.slice';
import styles from './Auth.module.scss';
import { useGoogleLogin } from '@react-oauth/google';
import { PATHS, PATHS_RESULT } from '@constants/PATHS';

const marginBottom = 32;

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

export type GoogleResponse = {
    clientId: string;
    credential: string;
    select_by: string;
}

const EmailLabel = () => <span className={styles.emailLabel}>e-mail:</span>

export const Auth: FC = () => {
    const [login] = cleverFitApi.useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuth, error, isFetching, rememberMe } = useAppSelector(state => state.auth);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm();

    const [isEmailCorrect, setIsEmailCorrect] = useState(true);

    const onFinish = async (values: FormValues) => {
        const { email, password, remember } = values;

        if (!remember) {
            localStorage.removeItem('accessToken');
            dispatch(setRememberMe(false));
        }

        dispatch(setCredentials({ email, password }))
        login({ email, password });
    };

    const onRestorePassword = async () => {
        form.validateFields(['email'])
            .then(async (values) => {
                setIsEmailCorrect(true);
                const { email, password } = values;
                dispatch(setCredentials({ email, password }));
                if (email) {
                    const data = await checkEmail({ email }) as CheckEmailResponse;
                    if (data.data) {
                        navigate(PATHS.authConfirmEmail.path, { state: { from: location } });
                    }
                }

            })
            .catch((e) => {
                dispatch(setAuthError(e));
            })
            ;
    };

    useEffect(() => {
        if (isAuth) {
            navigate(PATHS.main.path, { state: { from: location } });
        }
    }, [isAuth]);

    useEffect(() => {
        if (error) {
            switch (error.status) {
                case 400:
                    navigate(PATHS_RESULT.errorLogin, { state: { from: location } });
                    break;

                case 404:
                    if (error.data?.message === 'Email не найден') {
                        navigate(PATHS_RESULT.errorCheckEmailNoExist, { state: { from: location } });
                    } else {
                        navigate(PATHS_RESULT.errorLogin, { state: { from: location } });
                    }
                    break;

                case 409:
                    navigate(PATHS_RESULT.errorCheckEmail);
                    break;

                default:
                    navigate(PATHS_RESULT.errorCheckEmail, { state: { from: location } });
            }
        }

        dispatch(resetError());
    }, [error]);

    const onFieldsChange = () => {
        setIsEmailCorrect(!form.getFieldError('email').length);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            const { access_token } = tokenResponse;
            dispatch(setToken(access_token));
            dispatch(setAuth(true));

            if (rememberMe) {
                localStorage.setItem('accessToken', access_token);
            }

            navigate(PATHS.main.path);
        },
    });

    return (
        <Wrapper>
            <>
                {isFetching && <Loader />}
                <div className={styles.auth__page}>
                    <AuthWrapper>
                        <FormWrapper>
                            <>
                                <Logo />
                                <Form
                                    form={form}
                                    name="auth"
                                    style={{ width: '100%', maxWidth: 368 }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    size={'large'}
                                    onFieldsChange={onFieldsChange}
                                >
                                    <AuthTabs activeTab={'auth'} />
                                    <Form.Item<FieldType>
                                        name="email"
                                        rules={[
                                            { required: true, message: '' },
                                            {
                                                type: 'email',
                                                message: '',
                                            },
                                        ]}
                                        style={{ marginBottom }}
                                    >
                                        <Input
                                            addonBefore={<EmailLabel />}
                                            data-test-id={'login-email'}
                                        />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        name="password"
                                        rules={[{
                                            required: true,
                                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                            min: 8
                                        }]}
                                        style={{ marginBottom, letterSpacing: '-0.5px' }}
                                    >
                                        <Input.Password
                                            placeholder={'Пароль'}
                                            data-test-id={'login-password'}
                                        />
                                    </Form.Item>

                                    <div className={styles.rememberMe}>
                                        <Form.Item<FieldType>
                                            name="remember"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Checkbox
                                                defaultChecked={true}
                                                data-test-id={'login-remember'}
                                                onClick={() => dispatch(setRememberMe(!rememberMe))}
                                            >
                                                Запомнить меня
                                            </Checkbox>
                                        </Form.Item>
                                        <Button
                                            className={styles.rememberMe__link}
                                            type={'link'}
                                            onClick={onRestorePassword}
                                            disabled={!isEmailCorrect}
                                            data-test-id={'login-forgot-button'}
                                        >
                                            Забыли пароль?
                                        </Button>
                                    </div>
                                    <div className={styles.auth__btns}>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                block
                                                data-test-id='login-submit-button'
                                            >
                                                Войти
                                            </Button>
                                        </Form.Item>
                                        <Button
                                            type="default"
                                            className={styles.auth__googleBtn}
                                            block
                                            onClick={() => googleLogin()}
                                        >
                                            Войти через Google
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        </FormWrapper>
                    </AuthWrapper>
                </div>
            </>
        </Wrapper>
    );
};
