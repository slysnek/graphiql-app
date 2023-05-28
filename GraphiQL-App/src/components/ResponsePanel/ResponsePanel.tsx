import { useCallback, useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { ErrorObject } from '../../types/interfaces';
import ResponsePanelView from '../ResponsePanelView/ResponsePanelView';
import { PanelSpinner } from './PanelSpinner';
import { getErrorMessage } from '../../helpers/Utils';
/* eslint-disable react-hooks/exhaustive-deps */

export const ResponsePanel = () => {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);
  const isRequested: boolean = useAppSelector((state) => state.queryParameters.isRequested);
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

  const fetchData = useCallback(() => {
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
  }, [errInit, gqlQuery, queryParameters]);

  useEffect(() => {
    if (isRequested) {
      fetchData();
    }

    dispatch(
      setQueryParameters({
        ...queryParameters,
        isRequested: false,
        isLoaded: loading,
      })
    );
  }, [isRequested, fetchData, dispatch, queryParameters, loading, data]);

  useEffect(() => {
    if (err.error) {
      dispatch(
        setQueryParameters({
          ...queryParameters,
          error: err.error,
          error_name: err.name,
          error_message: err.message,
          result: err.body,
        })
      );
    } else if (error) {
      dispatch(
        setQueryParameters({
          ...queryParameters,
          error: true,
          error_name: error.name,
          error_message: error.message,
          result: JSON.stringify(error, null, '\t'),
        })
      );
    }
    if (!(err.error || error) && data) {
      dispatch(
        setQueryParameters({
          ...queryParameters,
          error: false,
          error_name: '',
          error_message: '',
          result: JSON.stringify(data, null, '\t'),
        })
      );
    }
  }, [err, error, data]);

  if (loading) {
    return <PanelSpinner />;
  }
  console.log('ResponsePanel re-render');
  return (
    <>
      <ResponsePanelView
        error={queryParameters.error}
        error_name={queryParameters.error_name}
        error_message={queryParameters.error_message}
        result={queryParameters.result}
      />
    </>
  );
};
