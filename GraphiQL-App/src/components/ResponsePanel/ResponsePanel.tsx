import { useEffect, useState } from 'react';
import { DocumentNode, gql, useLazyQuery } from '@apollo/client';
import { CircularProgress, TextField } from '@mui/material';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { ErrorPanel } from '../ErrorPanel/ErrorPanel';

import styles from './ResponsePanel.module.css';

export const ResponsePanel = () => {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isRequested: boolean = useAppSelector((state) => state.queryParameters.isRequested);
  const [results, setResults] = useState<string | undefined>();
  const [queryVars, setQueryVars] = useState('');

  const [request, setRequest] = useState<DocumentNode>();

  const initReq = gql`
    {
      field {
        subField
      }
    }
  `;

  const [gqlRequest, { called, loading, error, data }] = useLazyQuery(initReq);
  let tryCatchError = false;

  let tmpReq = undefined;
  let tmpVar = '';
  let ifError = false;

  useEffect(() => {
    tryCatchError = false;
    if (!isRequested) {
      return;
    }
    try {
      setRequest(gql`
        ${queryParameters.body}
      `);
      // tmpReq = gql`
      //   ${queryParameters.body}
      // `;
      // gqlRequest({
      //   query: tmpReq,
      //   variables: queryParameters.variables,
      // });
      //console.log('Try', request, queryVars);
    } catch (e: Error) {
      tryCatchError = true;
      const value = JSON.stringify(e, null, '\t');
      setResults(value);
      //tmpVar = JSON.parse(queryParameters.variables);
      //console.log('Try error', value);

      return;
    }

    console.log('gqlRequest', tmpReq, queryParameters.variables);

    if (called && loading) {
      dispatch(
        setQueryParameters({
          ...queryParameters,
          isLoaded: true,
        })
      );
    } else {
      dispatch(
        setQueryParameters({
          ...queryParameters,
          isLoaded: false,
          isRequested: false,
        })
      );
    }

    //JSON.parse(queryParameters.variables),
    if (data) {
      const value = JSON.stringify(data, null, '\t');
      setResults((value) => value);
      console.log('Data', value);
    } else {
      const value = JSON.stringify(error, null, '\t');
      setResults(value);
      console.log('Error', value);
    }
  }, [isRequested, data, request, results, called, loading, gqlRequest]);

  if (called && loading) {
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

  console.log('JSX');
  console.log('JSX results', results);
  console.log('JSX data', data);
  console.log('JSX error', error);
  // const tmp_result = error
  //   ? JSON.stringify(error, null, '\t')
  //   : data
  //   ? JSON.stringify(data, null, '\t')
  //   : '';
  tryCatchError = tryCatchError || error;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Response</h3>
        <h3 style={{ backgroundColor: tryCatchError ? 'red' : 'green', color: 'white' }}>
          {tryCatchError ? error.name + ':' + error.message : data ? 'Success' : ''}
        </h3>
        <div>{results}</div>
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
