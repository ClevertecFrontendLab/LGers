import { Wrapper } from '@components/Wrapper';
import s from './Auth.module.scss';
import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AuthWrapper } from '@components/AuthWrapper';
import { FormWrapper } from '@pages/auth/components/FormWrapper';
import { Logo } from '@pages/auth/components/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthTabs } from '@pages/auth/components/AuthTabs';
import {
    CheckEmailResponse,
    cleverFitApi,
    useCheckEmailMutation,
    UserCredentials
} from '@redux/api/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';
import { resetError, setCredentials } from '@redux/auth/auth.slice';

const marginBottom = 32;

type FieldType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const EmailLabel = () => {
    return (
        <>
            <span className={s.emailLabel}>e-mail:</span>
        </>
    )
}

export const Auth: FC = () => {
    const [login] = cleverFitApi.useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuth, error, isFetching } = useAppSelector(state => state.auth);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm();
    const [isEmailCorrect, setIsEmailCorrect] = useState(true);

    const onFinish = (values: UserCredentials) => {
        if (!form.getFieldValue('rememberMe')) {
            localStorage.removeItem('accessToken');
        }
        const { email, password } = values;
        dispatch(setCredentials({ email, password }))
        login({ email, password });
    };

    const onRestorePassword = async () => {
        const isEmailCorrect =  form.getFieldValue('email');

        setIsEmailCorrect(isEmailCorrect);
        if (isEmailCorrect) {
            const { email, password } = form.getFieldsValue();
            dispatch(setCredentials({ email, password }));
            isEmailCorrect && checkEmail(email);
            const data = await checkEmail(email) as CheckEmailResponse;

            if (data.data) {
                navigate('/auth/confirm-email', { state: { from: location } });
            }
        }

    };

    useEffect(() => {
        if (isAuth) {
            navigate('/', { state: { from: location } });
        }
    }, [isAuth]);

    useEffect(() => {
        if (error) {
            if (error.status === 404 && error.data?.message === 'Email не найден') {
                navigate('/result/error-check-email-no-exist', { state: { from: location } });
            } else if (error.status === 404) {
                navigate('/result/error-login', { state: { from: location } });
            } else {
                navigate('/result/error-check-email', { state: { from: location } });
            }
        }
        dispatch(resetError());
    }, [error]);

    const onFieldsChange = () => {
        setIsEmailCorrect(!form.getFieldError('email').length);
    };

    return (
        <Wrapper>
            <>
                {isFetching && <Loader />}
                <div className={s.auth__page}>
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
                                    autoComplete="off"
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

                                    <div className={s.rememberMe}>
                                        <Form.Item<FieldType>
                                            name="rememberMe"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Checkbox defaultChecked={true}
                                                      data-test-id={'login-remember'}>
                                                Запомнить меня
                                            </Checkbox>
                                        </Form.Item>
                                        <Button
                                            className={s.rememberMe__link}
                                            type={'link'}
                                            onClick={onRestorePassword}
                                            disabled={!isEmailCorrect}
                                            data-test-id={'login-forgot-button'}
                                        >
                                            Забыли пароль?
                                        </Button>
                                    </div>
                                    <div className={s.auth__btns}>
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
                                        <Button type="default" className={s.auth__googleBtn} block>
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
