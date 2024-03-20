import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useNavigate } from 'react-router-dom';
import { authSelector, resetError, setCredentials } from '@redux/auth/auth.slice';
import { cleverFitApi } from '@redux/api/api';
import { UserCredentials } from '@redux/api/api.types';
import { Button, Form, Input } from 'antd';
import { Wrapper } from '@components/Wrapper';
import { AuthWrapper } from '@components/AuthWrapper';
import { FormWrapper } from '@pages/auth/components/FormWrapper';
import { Logo } from '@pages/auth/components/Logo';
import { AuthTabs } from '@pages/auth/components/AuthTabs';
import { EmailLabel } from '@pages/auth/components/EmailLabel';
import { Loader } from '@components/Loader';
import { PATHS, PATHS_RESULT } from '@constants/PATHS';
import { STATUS } from '@constants/STATUS';
import styles from './Registration.module.scss';

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
    const { isAuth, error, isFetching, email, password } = useAppSelector(authSelector);

    useEffect(() => {
        if (error && email && password) {
            dispatch(resetError());
            registration({ email, password });
        }
    }, [dispatch]);

    useEffect(() => {
        if (error && error.status === STATUS.CODE_409) {
            dispatch(resetError());
            navigate(PATHS_RESULT.errorUserExist);
        } else if (error) {
            navigate(PATHS_RESULT.error);
        }
    }, [error, navigate, dispatch]);

    useEffect(() => {
        if (isAuth) {
            navigate(PATHS.root.path);
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (result.isSuccess) {
            navigate(PATHS_RESULT.success);
        }
    }, [result, navigate]);

    const onFinish = (values: UserCredentials) => {
        const { email, password } = values;
        dispatch(setCredentials({ email, password }));
        registration({ email, password });
    };

    return (
        <Wrapper>
            <>
                {isFetching && <Loader />}
                <div className={styles.auth__page}>
                    {/*<Reg />*/}
                    <AuthWrapper>
                        <FormWrapper>
                            <>
                                <Logo />
                                <Form
                                    form={form}
                                    name='basic'
                                    style={{ width: '100%', maxWidth: 368 }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete='off'
                                    size={'large'}
                                    scrollToFirstError
                                >
                                    <AuthTabs activeTab={'registration'} />
                                    <div className={styles.auth__items}>
                                        <Form.Item<FieldType>
                                            name='email'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
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
                                            name='password'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                                },
                                                { min: 3, message: 'min 3!' },
                                            ]}
                                            style={{
                                                marginBottom: 46,
                                                letterSpacing: '-1px',
                                                fontSize: 12,
                                            }}
                                            help={
                                                'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                            }
                                        >
                                            <Input.Password
                                                placeholder={'Пароль'}
                                                data-test-id='registration-password'
                                            />
                                        </Form.Item>
                                        <Form.Item<FieldType>
                                            name='confirmPassword'
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пароли не совпадают',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (
                                                            !value ||
                                                            getFieldValue('password') === value
                                                        ) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error('Пароли не совпадают'),
                                                        );
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
                                    <div className={styles.auth__btns}>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                block
                                                data-test-id={'registration-submit-button'}
                                            >
                                                Войти
                                            </Button>
                                        </Form.Item>
                                        <Button
                                            type='default'
                                            className={styles.auth__googleBtn}
                                            block
                                            disabled
                                        >
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
