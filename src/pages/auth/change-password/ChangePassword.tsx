import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import styles from '@pages/auth/Auth.module.scss';
import { AuthResultWrapper } from '@components/AuthResultWrapper';
import { useChangePasswordMutation } from '@redux/api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '@redux/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';

type Props = {
    email?: string;
}

type FieldType = {
    password: string;
    confirmPassword: string;
};

export const ChangePassword: FC<Props> = () => {
    const marginBottom = 32;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [changePassword, changePasswordResult] = useChangePasswordMutation();

    const { email, password, isFetching } = useAppSelector((state) => state.auth);
    const onFinish = (values: FieldType) => {
        const { password, confirmPassword } = values;
        dispatch(setCredentials({ email, password }));
        changePassword({ password, confirmPassword });
    };

    useEffect(() => {
        if (changePasswordResult.isSuccess) {
            navigate('/result/success-change-password');
        }
        if (changePasswordResult.isError) {
            navigate('/result/error-change-password', { state: { from: location } });
        }
    }, [changePasswordResult])

    useEffect(() => {
        if (email && password) {
            changePassword({ password, confirmPassword: password });
        }
    }, [email, password])

    return (
        <AuthResultWrapper>
            <>
                {isFetching && <Loader />}
                <h3 className={styles.auth__title}>Восстановление аккауанта</h3>
                <Form
                    form={form}
                    name="auth-change-password"
                    style={{ margin: 32, }}
                    initialValues={{
                        password,
                        confirmPassword: password,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    size={'large'}

                >
                    <Form.Item<FieldType>
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            },
                            { min: 3, message: 'min 3!' },
                        ]}
                        style={{ marginBottom }}
                        help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                    >
                        <Input.Password
                            placeholder={'Новый пароль'}
                            data-test-id={'change-password'}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
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
                        style={{ marginBottom }}
                    >
                        <Input.Password
                            placeholder={'Повторите пароль'}
                            data-test-id={'change-confirm-password'}
                        />
                    </Form.Item>
                    <div className={styles.auth__btns}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // size="large"
                                block
                                data-test-id={'change-submit-button'}
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </>
        </AuthResultWrapper>
    );
}
