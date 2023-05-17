import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment, TextField, IconButton, Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { FormProps, FormDataSignUp } from '../../types/interfaces';
import { schemaValidation, schemaValidationLogIn } from '../../helpers/schemaValidate';

import GoogleIcon from '@mui/icons-material/Google';

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
                    fullWidth
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
                  fullWidth
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
                  fullWidth
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
                    fullWidth
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
              sx={{
                borderRadius: 10,
              }}
            >
              {props.typeForm !== 'login' ? 'Create User' : 'Log In'}{' '}
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={8} sx={{ p: '3px', m: 'auto', color: 'steelblue' }}>
        <span>OR</span>
      </Grid>
      <Grid item xs={10}>
        <Button
          startIcon={<GoogleIcon />}
          type="button"
          variant="contained"
          onClick={props.onGoogleHandler}
          sx={{
            margin: '10px auto',
            borderRadius: '10px',
            backgroundColor: 'steelblue',
            border: '1px solid #8E8C7F',
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
