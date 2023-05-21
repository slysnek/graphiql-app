import { useEffect, useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './ResponsePanelView.module.css';

interface ResponsePanelViewProps {
  error: boolean;
  error_name?: string;
  error_message?: string;
  result?: string;
}

export const ResponsePanelView = (props: ResponsePanelViewProps) => {
  const { t } = useTranslation();
  const [openError, setOpenError] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(true);

  const handleErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpenError(false);
  };

  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpenSuccess(false);
  };

  useEffect(() => {
    if (props.error) {
      setOpenError(true);
    }
    if (!props.error && props.result !== '' && props.result !== undefined && !openSuccess) {
      setOpenSuccess(true);
    }
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
