import { useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { CircularProgress, TextField } from '@mui/material';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import { ErrorObject } from '../../types/interfaces';
import styles from './ResponsePanel.module.css';

function getErrorMessage(error: unknown): ErrorObject {
  if (error instanceof Error)
    return {
      error: true,
      name: error.name,
      message: error.message,
    };
  return {
    error: true,
    name: '',
    message: String(error),
  };
}

export const ResponsePanel = () => {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isRequested: boolean = useAppSelector((state) => state.queryParameters.isRequested);
  const [results, setResults] = useState<string | undefined>();
  const [err, setErr] = useState<ErrorObject>();

  const errInit = { error: false, name: '', message: '' };
  const initQuery = gql`
    {
      table {
        field
      }
    }
  `;

  const [gqlQuery, { loading, error, data }] = useLazyQuery(initQuery);

  useEffect(() => {
    console.log('ResponsePanel useEffect isRequested start', isRequested);
    if (isRequested) {
      console.log('ResponsePanel useEffect isRequested after', isRequested);
      setErr({ ...errInit });
      setResults('');
      try {
        console.log('ResponsePanel queryParameters.body', queryParameters.body);
        console.log('ResponsePanel  queryParameters.variables', queryParameters.variables);
        gqlQuery({
          query: gql`
            ${queryParameters.body}
          `,
          variables: JSON.parse(
            queryParameters.variables === '' ? '{}' : queryParameters.variables
          ),
        });
      } catch (e) {
        setErr({
          ...getErrorMessage(e),
        });
        setResults(JSON.stringify(e, null, '\t'));
        console.log('Try catch error', JSON.stringify(e, null, '\t'));
      }
    }

    dispatch(
      setQueryParameters({
        ...queryParameters,
        isRequested: false,
        isLoaded: loading,
      })
    );

    //if (err?.error) return;

    if (error || err?.error) {
      const value = JSON.stringify(error, null, '\t');
      console.log('ResponsePanel error', value);
      setErr({
        error: true,
        name: error?.name,
        message: error?.message,
      });
      setResults(value);
    } else if (data) {
      const value = JSON.stringify(data, null, '\t');
      console.log('ResponsePanel data', value);
      setErr({
        error: false,
        name: '',
        message: '',
      });
      setResults(value);
    } else {
      setResults('');
    }
  }, [isRequested, loading, error, data]);

  //console.log('ResponsePanel render start...');

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  console.log('ResponsePanel render result', results);
  console.log('ResponsePanel render err', err);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Response</h3>
        <h3 style={{ backgroundColor: err?.error ? 'red' : 'green', color: 'white' }}>
          {err?.error ? err.name + ':' + err.message : data ? 'Success' : ''}
        </h3>
        <TextField
          value={results}
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
