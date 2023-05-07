import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithGoogle } from '../../firebase';

interface FormProps {
  typeForm: string;
  onclickSubmit: (email: string, password: string) => Promise<void>;
}

const schemaValidation = yup.object({
  name: yup.string().required('Name is required').min(4, 'at least 4 letters'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'at least 8 letters')
    .matches(/^(?=.*[A-Z]).+$/, 'at least one capital letter')
    .matches(/^(?=.*\d).+$/, 'at least one digit')
    .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'at least one special character'),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], "passwords don't matches"),
});

type FormData = yup.InferType<typeof schemaValidation>;

function Form(props: FormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.typeForm !== 'login' && (
        <div>
          <label htmlFor="nickName">E-mail</label>
          <input placeholder="Enter your name" type="text" id="nickName" {...register('name')} />
          <div className="error-box error-name">{errors.name?.message}</div>
        </div>
      )}

      <div>
        <label htmlFor="emailInput">E-mail</label>
        <input placeholder="Enter e-mail..." type="email" id="emailInput" {...register('email')} />
        <div className="error-box error-email">{errors.email?.message}</div>
      </div>

      <div>
        <label htmlFor="passwordInput">Password</label>
        <input
          placeholder="Enter password..."
          type="password"
          id="passwordInput"
          {...register('password')}
        />
        <div className="error-box error-password">{errors.password?.message}</div>
      </div>

      {props.typeForm !== 'login' && (
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Confirm password..."
            {...register('passwordConfirm')}
          />
          <div className="error-box error-confirm">{errors.passwordConfirm?.message}</div>
        </div>
      )}

      <button type="submit">{props.typeForm !== 'login' ? 'Create User' : 'Log In'}</button>
      <button type="button">
        {props.typeForm === 'login' ? 'Create with Google' : 'Log In with Google'}
      </button>
    </form>
  );
}

export default Form;