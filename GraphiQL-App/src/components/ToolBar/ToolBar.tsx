import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { setDocPaneState } from '../../store/slices/docPaneStateSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './ToolBar.module.css';

export const ToolBar = () => {
  const dispatch = useAppDispatch();
  const docPanVisible = useAppSelector((state) => state.docPaneState.visible);
  let tooltipTitle = docPanVisible ? 'Hide documentation explorer' : 'Show documentation explorer';

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
