import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithGoogle } from '../../firebase';
import { InputAdornment, TextField, IconButton, Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface FormProps {
  typeForm: string;
  onclickSubmit?: (email: string, password: string) => Promise<void>;
  onclickLogIn?: (email: string, password: string, name: string) => Promise<void>;
}

const schemaValidation = yup.object({
  nameField: yup.string().required('Name is required').min(4, 'at least 4 letters'),
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

const schemaValidationLogIn = yup.object({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'at least 8 letters')
    .matches(/^(?=.*[A-Z]).+$/, 'at least one capital letter')
    .matches(/^(?=.*\d).+$/, 'at least one digit')
    .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'at least one special character'),
});

type FormDataSignUp = yup.InferType<typeof schemaValidation>;

function Form(props: FormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormDataSignUp>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver:
      props.typeForm === 'login'
        ? yupResolver(schemaValidationLogIn)
        : yupResolver(schemaValidation),
  });

  const onSubmit: SubmitHandler<FormDataSignUp> = async (data: FormDataSignUp) => {
    if (props.typeForm === 'login') {
      props.onclickSubmit && props.onclickSubmit(data.email, data.password);
    } else {
      props.onclickLogIn && props.onclickLogIn(data.email, data.password, data.nameField);
    }

    reset();
  };

  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      sx={{
        m: '1%',
        width: '50%',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
        p: '1%',
        borderRadius: '10px',
      }}
    >
      <Grid
        container
        direction="column"
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form_container">
          {props.typeForm !== 'login' && (
            <Grid item xs={12} sx={{ padding: '5px 0', width: '100%' }}>
              <Controller
                name="nameField"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nick name"
                    variant="outlined"
                    error={!!errors.nameField}
                    helperText={errors.nameField ? errors.nameField.message : ''}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12} sx={{ padding: '5px 0', width: '100%' }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: '5px 0' }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPass ? 'text' : 'password'}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {props.typeForm !== 'login' && (
            <Grid item xs={12} sx={{ padding: '5px 0' }}>
              <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type={showPassConfirm ? 'text' : 'password'}
                    variant="outlined"
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassConfirm(!showPassConfirm)}>
                            {showPassConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={10} sx={{ padding: '5px 0', justifyContent: 'center', m: 'auto' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                borderRadius: 10,
              }}
            >
              {props.typeForm !== 'login' ? 'Create User' : 'Log In'}{' '}
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={8} sx={{ p: '3px', m: 'auto' }}>
        <span>OR</span>
      </Grid>
      <Grid item xs={10} sx={{ margin: '5px auto' }}>
        <Button
          type="button"
          variant="contained"
          onClick={signInWithGoogle}
          style={{
            borderRadius: 10,
            backgroundColor: '#21b6ae',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
        >
          {props.typeForm === 'login' ? 'LogIn with Google' : 'Create with Google'}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;
