import { Wrapper } from '@components/Wrapper';
import s from './Registration.module.scss'; // todo registration
import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { AuthWrapper } from '@components/AuthWrapper';
import { FormWrapper } from '@pages/auth/components/FormWrapper';
import { Logo } from '@pages/auth/components/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthTabs } from '@pages/auth/components/AuthTabs';
import { EmailLabel } from '@pages/auth/components/EmailLabel';
import { cleverFitApi, UserCredentials } from '@redux/api/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';
import { resetError, setCredentials } from '@redux/auth/auth.slice';

const marginBottom = 32;

type FieldType = {
    email?: string;
    email2?: string;
    password?: string;
    password2?: string;
    confirmPassword?: string;
};

export const Registration: FC = () => {
    const [form] = Form.useForm();
    const [registration, result] = cleverFitApi.useRegistrationMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth, error, isFetching, email, password } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (error && email && password) {
            dispatch(resetError());
            registration({ email, password });
        }
    }, []);

    useEffect(() => {
        if (error && error.status === 409) {
            dispatch(resetError());
            navigate('/result/error-user-exist');
        } else if (error) {
            navigate('/result/error');
        }
    }, [error]);

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    useEffect(() => {
        console.log('result', result);
        if (result.isSuccess) {
            navigate('/result/success');
        }
    }, [result]);

    const onFinish = (values: UserCredentials) => {
        const { email, password } = values
        dispatch(setCredentials({ email, password }));
        registration({ email, password });
    };

    return (
        <Wrapper>
            <>
                {isFetching && <Loader />}
                <div className={s.auth__page}>
                    {/*<Reg />*/}
                    <AuthWrapper>
                        <FormWrapper>
                            <>
                                <Logo />
                                <Form
                                    form={form}
                                    name="basic"
                                    style={{ width: '100%', maxWidth: 368 }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    size={'large'}
                                    scrollToFirstError
                                >
                                    <AuthTabs activeTab={'registration'} />
                                    <div className={s.auth__items}>
                                        <Form.Item<FieldType>
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: ''
                                                },
                                                {
                                                    type: 'email',
                                                    message: '',
                                                },
                                            ]}
                                            style={{ marginBottom }}
                                        >
                                            <Input
                                                addonBefore={<EmailLabel />}
                                                data-test-id={'registration-email'}
                                            />
                                        </Form.Item>
                                        <Form.Item<FieldType>
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                                },
                                                { min: 3, message: 'min 3!' },
                                            ]}
                                            style={{
                                                marginBottom: 46,
                                                letterSpacing: '-1px',
                                                fontSize: 12
                                            }}

                                            help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                                        >
                                            <Input.Password
                                                placeholder={'Пароль'}
                                                data-test-id='registration-password'

                                            />
                                        </Form.Item>
                                        <Form.Item<FieldType>
                                            name="confirmPassword"
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пароли не совпадают'
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Пароли не совпадают'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder={'Подтвердите пароль'}
                                                style={{ marginBottom: 0 }}
                                                data-test-id={'registration-confirm-password'}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={s.auth__btns}>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                data-test-id={'registration-submit-button'}
                                            >
                                                Войти
                                            </Button>
                                        </Form.Item>
                                        <Button type="default" className={s.auth__googleBtn} block
                                                disabled>
                                            Регистрация через Google
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
