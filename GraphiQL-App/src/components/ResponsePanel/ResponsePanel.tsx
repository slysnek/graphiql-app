import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import { Box } from '@mui/material';
import styles from './ResponsePanel.module.css';

import { useAppSelector } from '../../store/hooksRedux';

export const ResponsePanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Response</h3>
        <Box component="span" sx={{ display: 'block' }}>
          --Response--
        </Box>
      </div>
    </div>
  );
};
