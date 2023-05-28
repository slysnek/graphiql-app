import { memo, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ResponsePanelViewProps } from '../../types/interfaces';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { json } from '@codemirror/lang-json';
import styles from './ResponsePanelView.module.css';

const ResponsePanelView = (props: ResponsePanelViewProps) => {
  const { t } = useTranslation();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const options = {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLine: false,
  };

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
    if (!props.error && props.result !== '' && props.result !== undefined) {
      setOpenSuccess(true);
    }
  }, [props.error, props.result]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h4
          style={{
            backgroundColor: 'rgb(242, 241, 248)',
          }}
        >
          {t('editorPage.response')}
        </h4>
        <div>
          <span
            style={{
              display: 'flex',
              backgroundColor: props.error ? '#a42b9a' : 'rgba(63, 174, 196, 0.7)',
              color: 'white',
              fontSize: '17px',
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
          theme={noctisLilac}
          extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true), json()]}
          basicSetup={options}
        />
      </div>
    </div>
  );
};
export default memo(ResponsePanelView);
