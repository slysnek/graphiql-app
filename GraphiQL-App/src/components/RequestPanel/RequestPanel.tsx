import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './RequestPanel.module.css';
import CMEditor from '../CMEditor/CMEditor';

export function RequestPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Button variant="contained" startIcon={<PlayArrowIcon />}>
          Query
        </Button>
        <CMEditor />
      </div>
    </div>
  );
}
