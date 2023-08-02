import * as yup from 'yup';

//error messages are typed like keys to i18n
//straight queries to i18n from this objest don't work for some reason
export const schemaValidation = yup.object({
  nameField: yup.string().required('errors.nickname').min(4, 'errors.nicknameMin'),
  email: yup.string().required('errors.email').email('errors.emailValid'),
  password: yup
    .string()
    .required('errors.password')
    .min(8, 'errors.passwordMin')
    .matches(/^(?=.*[A-ZА-Я]).+$/, 'errors.passwordCap')
    .matches(/^(?=.*\d).+$/, 'errors.passwordDigit')
    .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'errors.passwordChar'),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], 'errors.passwordMatch'),
});

export const schemaValidationLogIn = yup.object({
  email: yup.string().required('errors.email').email('errors.emailValid'),
  password: yup
    .string()
    .required('errors.password')
    .min(8, 'errors.passwordMin')
    .matches(/^(?=.*[A-ZА-Я]).+$/, 'errors.passwordCap')
    .matches(/^(?=.*\d).+$/, 'errors.passwordDigit')
    .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'errors.passwordChar'),
});
