import { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import { ErrorObject } from '../../types/interfaces';
import { ResponsePanelView } from '../ResponsePanelView/ResponsePanelView';
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
  const isLoaded: boolean = useAppSelector((state) => state.queryParameters.isLoaded);

  const errInit: ErrorObject = { error: false, name: '', message: '', body: '' };
  const [err, setErr] = useState<ErrorObject>(errInit);

  const initQuery = gql`
    {
      table {
        field
      }
    }
  `;

  const [gqlQuery, { loading, error, data }] = useLazyQuery(initQuery, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (isRequested) {
      setErr({ ...errInit });
      try {
        gqlQuery({
          query: gql`
            ${queryParameters.body}
          `,
          variables: JSON.parse(
            queryParameters.variables === '' || queryParameters.variables === undefined
              ? '{}'
              : queryParameters.variables
          ),
        });
      } catch (e) {
        setErr({
          ...getErrorMessage(e),
          body: JSON.stringify(e, null, '\t'),
        });
      }
    }

    dispatch(
      setQueryParameters({
        ...queryParameters,
        isRequested: false,
        isLoaded: loading,
      })
    );
  }, [isRequested, isLoaded, err, loading, error, data]);

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

  if (err?.error || error) {
    return (
      <ResponsePanelView
        error={err?.error ? err.error : true}
        error_name={err?.error ? err.name : error?.name}
        error_message={err?.error ? err.message : error?.message}
        result={err?.error ? err.body : JSON.stringify(error, null, '\t')}
      />
    );
  }

  return (
    <ResponsePanelView
      error={false}
      error_name={''}
      error_message={''}
      result={JSON.stringify(data, null, '\t')}
    />
  );
};
