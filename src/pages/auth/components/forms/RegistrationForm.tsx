import React from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useNavigate} from 'react-router-dom';
import emailIcon from '../../../../assets/images/icon/email.svg';
import passwordIcon from '../../../../assets/images/icon/password.svg';
import {useAppDispatch} from '../../../../hooks';
import {authRegister} from '../../store/auth.slice';

const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const schema = yup
    .object({
        email: yup.string().email().required('Это обязательное поле'),
        password:
            yup.string()
                .required('Это обязательное поле')
                .matches(pattern, 'Пароль должен содержать не менне 8 символов и 1 большая, 1 маленькая, 1 цифра, 1 спец символ'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
            .required('Это обязательное поле'),
    })
    .required();
export const RegistrationForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit((data) => {
        const {email, password} = data;
        dispatch(authRegister({email, password, navigate}));
    });

    return (
        <form className="login_item_box_form" data-attribute="registration">
            <label>
                <img src={emailIcon} alt={'icon'}/>
                <input
                    {...register('email')}
                    type="text"
                    name="email"
                    className={errors?.email && 'error-input'}
                    placeholder="Email"/>
                <ErrorMessage errors={errors} name="email"/>
            </label>
            <label>
                <img src={passwordIcon} alt={'icon'}/>
                <input
                    type="password"
                    {...register('password', {required: 'Обязательное поле'})}
                    className={errors?.password && 'error-input'}
                    placeholder="Пароль"/>
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({message}) =>
                        <p style={{color: 'red', fontSize: '12px'}}>{message}</p>
                    }/>
            </label>
            <label>
                <img src={passwordIcon} alt={'icon'}/>
                <input
                    type="password"
                    placeholder="Повторить"
                    className={errors?.confirmPassword && 'error-input'}
                    {...register('confirmPassword')}
                />
                <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({message}) =>
                        <p style={{color: 'red', fontSize: '12px'}}>{message}</p>
                    }
                />
            </label>
            <button type={'button'} onClick={submit}>Регистрация</button>
        </form>
    );
};
