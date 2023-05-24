import CodeMirror from '@uiw/react-codemirror';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { graphql } from 'cm6-graphql';
import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { useTranslation } from 'react-i18next';
import styles from './QueryVariablesPane.module.css';
import { useCallback } from 'react';
import { Typography } from '@mui/material';

export function QueryVariablesPane() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);

  const onChange = useCallback(
    (value: string) => {
      const handleRequestFieldChange = (value: string) => {
        dispatch(
          setQueryParameters({
            ...queryParameters,
            variables: value,
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
        <h3>{t('editorPage.variables')}</h3>
        <Typography variant="body2" component="div" color="grey">
          {t('editorPage.help')}
        </Typography>
        <CodeMirror
          value={queryParameters.variables}
          theme={bbedit}
          extensions={[graphql()]}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
