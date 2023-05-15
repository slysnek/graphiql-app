import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './Operation.module.css';
import CMEditor from '../CMEditor/CMEditor';

export function Operation() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span>Operation</span>
        <Button variant="contained" startIcon={<PlayArrowIcon />}>
          Query
        </Button>
        <CMEditor />
      </div>
    </div>
  );
}
