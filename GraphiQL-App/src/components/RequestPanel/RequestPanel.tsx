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
        isRequested: true,
      })
    );
  };

  //console.log('RequestPanel queryParameters.isRequested', queryParameters.isRequested);
  //console.log('RequestPanel isLoaded', isLoaded);

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
              loading={isLoaded}
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                handleGqlRequest();
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
