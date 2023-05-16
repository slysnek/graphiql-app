import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { setDocPaneState } from '../../store/slices/docPaneStateSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './ToolBar.module.css';
import { useTranslation } from 'react-i18next';

export const ToolBar = () => {

  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch();
  const docPanVisible = useAppSelector((state) => state.docPaneState.visible);
  const tooltipTitle = docPanVisible ? t('editorPage.hideDocumentation') : t('editorPage.showDocumentation');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Tooltip title={tooltipTitle}>
          <IconButton
            aria-label="documentation explorer"
            style={{ fontSize: 50 }}
            onClick={() => {
              dispatch(
                setDocPaneState({
                  visible: !docPanVisible,
                })
              );
            }}
          >
            <AutoStoriesIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
