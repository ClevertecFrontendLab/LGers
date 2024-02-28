import { FC, useEffect, useState } from 'react';
import { Result } from 'antd';
import s from './ConfirmEmail.module.scss';
import { AuthResultWrapper } from '@components/AuthResultWrapper';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import VerificationInput from 'react-verification-input';
import './ConfirmEmail.scss';
import { useConfirmEmailMutation } from '@redux/api/api';
import { ResultStatusType } from 'antd/es/result';
import { Loader } from '@components/Loader';

export const ConfirmEmail: FC = () => {
    const [codeValue, setCodeValue] = useState('');
    const [hasCodeError, setHasCodeError] = useState(false);
    const navigate = useNavigate();

    const [confirmEmail, confirmEmailResult] = useConfirmEmailMutation();
    const { email, isFetching } = useAppSelector((state) => state.auth);
    const CODE = {
        title: 'Введите код для восстановления аккауанта',
    }

    const CODE_ERROR = {
        title: 'Неверный код. Введите код для восстановления аккауанта',
    }

    const [title, setTitle] = useState(CODE.title);
    const [status, setStatus] = useState<ResultStatusType | undefined>('info');

    const handleCodeChange = (value: string) => {
        if (hasCodeError) {
            setHasCodeError(false);
        }
        setCodeValue(value);
    };

    const handleCodeComplete = (value: string) => {
        setCodeValue('');
        confirmEmail({ email, code: value })
    };

    useEffect(() => {
        setHasCodeError(confirmEmailResult.isError);
        if (confirmEmailResult.isError) {
            setTitle(CODE_ERROR.title);
            setStatus('error')
        }

        if (confirmEmailResult.isSuccess) {
            navigate('/auth/change-password');
        }
    }, [confirmEmailResult]);

    return (
        <div>
            <AuthResultWrapper>
                <>
                    {isFetching && <Loader />}
                    <Result
                        className={s.CEWrapper}
                        status={status}
                        title={
                            <h3 className={s.CEWrapper__title}>
                                {title}
                            </h3>
                        }
                        subTitle={
                            <div className={s.CEWrapper__subTitle}>
                                <p>Мы отправили вам на e-mail <span className={s.CEWrapper__email}>
                                    {email}
                                </span> шестизначный код. Введите его в поле ниже.</p>
                            </div>
                        }
                    />
                    <VerificationInput
                        onChange={handleCodeChange}
                        onComplete={handleCodeComplete}
                        value={codeValue}
                        validChars="0-9"
                        autoFocus={true}
                        classNames={{
                            container: 'vInput__container',
                            character: hasCodeError ? 'vInput__character vInput__character_error' : 'vInput__character',
                            characterInactive: 'vInput__character_inactive',
                            characterSelected: 'vInput__character_selected',
                            characterFilled: 'vInput__character_filled',
                        }}
                        placeholder={''}
                        inputProps={
                            { 'data-test-id': 'verification-input' }
                        }
                    />
                    <p className={s.subtitle}>Не пришло письмо? Проверьте папку Спам.</p>
                </>
            </AuthResultWrapper>
        </div>
    );
}
