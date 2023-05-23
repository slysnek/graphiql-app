import { memo, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ResponsePanelViewProps } from '../../types/interfaces';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { json } from '@codemirror/lang-json';
import styles from './ResponsePanelView.module.css';

const ResponsePanelView = (props: ResponsePanelViewProps) => {
  const { t } = useTranslation();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  useEffect(() => {
    if (props.error) {
      setOpenError(true);
    }
    if (!props.error && props.result !== '' && props.result !== undefined && !openSuccess) {
      setOpenSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3
          style={{
            margin: '1rem',
          }}
        >
          {t('editorPage.response')}
        </h3>
        <div>
          <span
            style={{
              backgroundColor: props.error ? 'red' : 'green',
              color: 'white',
              fontSize: '20px',
              marginLeft: '1rem',
            }}
          >
            {props.error ? props.error_message : props.result ? t('editorPage.successMessage') : ''}
          </span>
          {props.error && (
            <Snackbar
              open={openError}
              autoHideDuration={3000}
              onClose={handleErrorClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Alert variant="filled" severity="error">
                {props.error_message}
              </Alert>
            </Snackbar>
          )}
          {!props.error && props.result !== undefined && props.result !== '' && (
            <Snackbar
              open={openSuccess}
              autoHideDuration={3000}
              onClose={handleSuccessClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Alert variant="filled" severity="success">
                {t('editorPage.successMessage')}
              </Alert>
            </Snackbar>
          )}
        </div>
        <CodeMirror
          value={props.result}
          theme={bbedit}
          extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true), json()]}
        />
      </div>
    </div>
  );
};
export default memo(ResponsePanelView);
