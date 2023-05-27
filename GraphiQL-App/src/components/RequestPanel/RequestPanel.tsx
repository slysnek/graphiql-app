import { useCallback, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeMirror from '@uiw/react-codemirror';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { graphql } from 'cm6-graphql';
import { useTranslation } from 'react-i18next';
import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import styles from './RequestPanel.module.css';
import { Alert, Snackbar, Typography } from '@mui/material';

export function RequestPanel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isLoaded = useAppSelector((state) => state.queryParameters.isLoaded);
  const [bodyError, setBodyError] = useState(false);
  const [bodyTextError, setBodyTextError] = useState('');

  const handleBodyErrorClose = () => {
    setBodyError(false);
  };

  const handleGqlRequest = () => {
    if (queryParameters.body === '') {
      const enterRequestBody = t('editorPage.enterRequestBody');
      setBodyError(true);
      setBodyTextError(enterRequestBody);
      return;
    } else {
      setBodyError(false);
      setBodyTextError('');
    }
    dispatch(
      setQueryParameters({
        ...queryParameters,
        isRequested: true,
        isLoaded: true,
      })
    );
  };

  const onChange = useCallback(
    (value: string) => {
      const handleRequestFieldChange = (value: string) => {
        if (value !== '') {
          setBodyError(false);
          setBodyTextError('');
        }
        dispatch(
          setQueryParameters({
            ...queryParameters,
            body: value,
          })
        );
      };
      handleRequestFieldChange(value);
    },
    [dispatch, queryParameters]
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h4>{t('editorPage.requestBody')}</h4>
          <div>
            <LoadingButton
              size="medium"
              variant="contained"
              loading={isLoaded}
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                handleGqlRequest();
              }}
              sx={{
                color: '#a42b9a',
                backgroundColor: 'rgba(63, 174, 196, 0.7)',
              }}
            >
              <span>{t('editorPage.run')}</span>
            </LoadingButton>
          </div>
        </div>
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Typography variant="body2" component="div" color="grey">
            {t('editorPage.helpGql')}
          </Typography>
          {bodyError && (
            <Snackbar
              open={bodyError}
              autoHideDuration={3000}
              onClose={handleBodyErrorClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Alert variant="filled" severity="error">
                {bodyTextError}
              </Alert>
            </Snackbar>
          )}
          <CodeMirror
            value={queryParameters.body}
            theme={bbedit}
            extensions={[graphql()]}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
