import { memo, useEffect, useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ResponsePanelViewProps } from '../../types/interfaces';
import styles from './ResponsePanelView.module.css';

const ResponsePanelView = (props: ResponsePanelViewProps) => {
  const { t } = useTranslation();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  useEffect(() => {
    if (props.error) {
      setOpenError(true);
    }
    if (!props.error && props.result !== '' && props.result !== undefined && !openSuccess) {
      setOpenSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3
          style={{
            margin: '1rem',
          }}
        >
          {t('editorPage.response')}
        </h3>
        <div>
          <span
            style={{
              backgroundColor: props.error ? 'red' : 'green',
              color: 'white',
              fontSize: '20px',
              marginLeft: '1rem',
            }}
          >
            {props.error ? props.error_message : props.result ? t('editorPage.successMessage') : ''}
          </span>
          {props.error && (
            <Snackbar
              open={openError}
              autoHideDuration={3000}
              onClose={handleErrorClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Alert variant="filled" severity="error">
                {props.error_message}
              </Alert>
            </Snackbar>
          )}
          {!props.error && props.result !== undefined && props.result !== '' && (
            <Snackbar
              open={openSuccess}
              autoHideDuration={3000}
              onClose={handleSuccessClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Alert variant="filled" severity="success">
                {t('editorPage.successMessage')}
              </Alert>
            </Snackbar>
          )}
        </div>
        <TextField
          value={props.result}
          id="standard-basic"
          variant="outlined"
          multiline
          fullWidth
          disabled
          sx={{
            '& fieldset': { border: 'none' },
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
          inputProps={{
            style: { fontSize: 20 },
          }}
        />
      </div>
    </div>
  );
};
export default memo(ResponsePanelView);
