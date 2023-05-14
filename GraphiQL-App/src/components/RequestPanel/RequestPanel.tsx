import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { graphqlClient } from '../../services/graphql_test';

import styles from './RequestPanel.module.css';

export function RequestPanel() {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);

  const handleRequestFieldChange = (value: string) => {
    dispatch(
      setQueryParameters({
        ...queryParameters,
        body: value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={() => {
            graphqlClient();
          }}
        >
          Query
        </Button>
        <h3>Request body</h3>
        <TextField
          value={queryParameters.body}
          id="outlined-multiline-flexible"
          multiline
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleRequestFieldChange(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
