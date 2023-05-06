import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormProps {
  typeForm: string;
}

const schemaValidation = yup.object({
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
    </form>
  );
}

export default Form;
