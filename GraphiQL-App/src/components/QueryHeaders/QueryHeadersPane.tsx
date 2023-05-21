import { useState } from 'react';
import TextField from '@mui/material/TextField';

import config from '../../config/config.json';
import styles from './QueryHeadersPane.module.css';

export function QueryHeadersPane() {
  const [localHeader, setLocalHeader] = useState(localStorage.getItem(config.HEADERS_QRY));
  const handleRequestFieldChange = (value: string) => {
    localStorage.setItem(config.HEADERS_QRY, value);
    setLocalHeader(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Headers</h3>
        <TextField
          value={localHeader}
          id="outlined-multiline-flexible"
          multiline
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleRequestFieldChange(event.target.value);
          }}
          inputProps={{ style: { fontSize: 20 } }}
        />
      </div>
    </div>
  );
}
