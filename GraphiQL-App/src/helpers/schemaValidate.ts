import * as yup from 'yup';

export const schemaValidation = yup.object({
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

export const schemaValidationLogIn = yup.object({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'at least 8 letters')
    .matches(/^(?=.*[A-Z]).+$/, 'at least one capital letter')
    .matches(/^(?=.*\d).+$/, 'at least one digit')
    .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'at least one special character'),
});
