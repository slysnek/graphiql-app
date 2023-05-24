import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { graphql } from 'cm6-graphql';
import { useTranslation } from 'react-i18next';
import config from '../../config/config.json';
import styles from './QueryHeadersPane.module.css';
import { Typography } from '@mui/material';

export function QueryHeadersPane() {
  const { t } = useTranslation();
  const [localHeader, setLocalHeader] = useState(localStorage.getItem(config.HEADERS_QRY) || '');
  const onChange = useCallback((value: string) => {
    const handleRequestFieldChange = (value: string) => {
      localStorage.setItem(config.HEADERS_QRY, value);
      setLocalHeader(value);
    };
    handleRequestFieldChange(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.headers')}</h3>
        <Typography variant="body2" component="div" color="grey">
          {t('editorPage.help')}
        </Typography>
        <CodeMirror
          value={localHeader}
          theme={bbedit}
          extensions={[graphql()]}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
