import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './RequestPanel.module.css';

export function RequestPanel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isLoaded = useAppSelector((state) => state.queryParameters.isLoaded);
  const [bodyError, setBodyError] = useState(false);
  const [bodyTextError, setBodyTextError] = useState('');

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
          <h3>t('editorPage.requestBody')</h3>
          <div>
            <LoadingButton
              size="large"
              variant="contained"
              loading={isLoaded}
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                handleGqlRequest();
              }}
            >
              <span>t('editorPage.run')</span>
            </LoadingButton>
          </div>
        </div>
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <TextField
            value={queryParameters.body}
            id="outlined-multiline-flexible"
            multiline
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleRequestFieldChange(event.target.value);
            }}
            error={bodyError}
            helperText={bodyTextError}
            inputProps={{ style: { fontSize: 20 } }}
          />
        </div>
      </div>
    </div>
  );
}
