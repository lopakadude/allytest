'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as auth from '../../auth/Auth';

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  let errorServer = '';

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    auth
      .login(data)
      .then(() => (window.location.href = '/'))
      .catch(() => {
        setError('root.serverError', {
          type: '400',
        });
      });
  };

  const onApplyClick: SubmitHandler<Inputs> = async () => {
    await setIsApplyClicked(true);
  };

  return (
    <main className={styles.main}>
      <form
        onSubmit={
          isApplyClicked ? handleSubmit(onSubmit) : handleSubmit(onApplyClick)
        }
        noValidate
        className={styles.main__form}
      >
        {!isApplyClicked && (
          <div>
            <input
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Введите email"
            />
            {errors.email && errors.email.type === 'required' && (
              <p className={styles.main__error}>Введите email</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p className={styles.main__error}>
                Введите email в верном формате
              </p>
            )}
          </div>
        )}
        {isApplyClicked && (
          <div className={styles.main__passwordContainer}>
            <input
              type={isPasswordClicked ? 'text' : 'password'}
              {...register('password', { required: true })}
              placeholder="Введите пароль"
            />
            {errors.password && errors.password.type === 'required' && (
              <p className={styles.main__error}>Введите пароль</p>
            )}
            <button
              onClick={() => setIsPasswordClicked(!isPasswordClicked)}
              className={styles.main__passwordButton}
              type="button"
            ></button>
          </div>
        )}
        {errors.root?.serverError && (
          <p className={styles.main__error}> Ошибка на сервере </p>
        )}
        <button className={styles.main__submit} type="submit">
          {isApplyClicked ? 'Вход' : 'Дальше'}
        </button>
      </form>
    </main>
  );
}