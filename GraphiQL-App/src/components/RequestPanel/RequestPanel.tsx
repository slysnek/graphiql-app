import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './RequestPanel.module.css';

export function RequestPanel() {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isRequested = useAppSelector((state) => state.queryParameters.isRequested);
  const [bodyError, setBodyError] = useState(false);
  const [bodyTextError, setBodyTextError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isRequested);
  }, [isRequested]);

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
  const handleGqlRequest = (value: boolean) => {
    if (queryParameters.body === '') {
      setBodyError(true);
      setBodyTextError('Please enter request body!');
      return;
    } else {
      setBodyError(false);
      setBodyTextError('');
    }
    dispatch(
      setQueryParameters({
        ...queryParameters,
        isRequested: value,
      })
    );
  };

  console.log('RequestPanel queryParameters.isRequested', isRequested);
  console.log('RequestPanel loading', loading);

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
          <h3>Request body</h3>
          <div>
            <LoadingButton
              size="large"
              variant="contained"
              loading={isRequested}
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                handleGqlRequest(true);
              }}
            >
              <span>Run</span>
            </LoadingButton>
          </div>
        </div>
        <div>
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
