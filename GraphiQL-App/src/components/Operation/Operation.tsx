import { useState } from 'react';

import styles from './Operation.module.css';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CMEditor from '../CMEditor/CMEditor';

export function Operation() {
  const [code, setCode] = useState('console.log');

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
