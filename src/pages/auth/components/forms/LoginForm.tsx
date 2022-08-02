import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import {useNavigate} from 'react-router-dom';
import {authLogin} from '../../store/auth.slice';
import logoImg from '../../../../assets/images/icon/login.svg';
import {useAppDispatch} from '../../../../hooks';
import passwordIcon from '../../../../assets/images/icon/password.svg';

interface ILoginProps {
    handler: () => void;
}

const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const schema = yup
    .object({
        email: yup.string().email().required('Это обязательное поле'),
        password:
            yup.string()
                .required('Это обязательное поле')
                .matches(pattern, 'Пароль должен содержать не менне 8 символов и 1 большая, 1 маленькая, 1 цифра, 1 спец символ'),
    })
    .required();

export const LoginForm = ({handler}:ILoginProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit((data) => {
        const {email, password} = data;
        dispatch(authLogin({email, password, navigate}));
    });
    return (
        <form className="login_item_box_form active" data-attribute="login">
            <label>
                <img src={logoImg} alt={'icon'} />
                <input
                    {...register('email')}
                    type="text"
                    name="email"
                    className={errors?.email && 'error-input'}
                    placeholder="Логин" />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({message}) =>
                        <p style={{color: 'red', fontSize: '12px'}}>{message}</p>
                    }/>
            </label>
            <label>
                <img src={passwordIcon} alt={'icon'} />
                <input
                    {...register('password')}
                    type="password"
                    name="password"
                    className={errors?.password && 'error-input'}
                    placeholder="Пароль" />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({message}) =>
                        <p style={{color: 'red', fontSize: '12px'}}>{message}</p>
                    }/>
            </label>

            <span className="login_item_box_form-forget" data-attribute="forget" onClick={handler}>Забыл пароль</span>

            <button onClick={submit}>Войти</button>
        </form>
    );
};
