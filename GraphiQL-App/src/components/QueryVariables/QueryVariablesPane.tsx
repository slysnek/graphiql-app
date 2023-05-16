import TextField from '@mui/material/TextField';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './QueryVariablesPane.module.css';

export function QueryVariablesPane() {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);

  const handleRequestFieldChange = (value: string) => {
    dispatch(
      setQueryParameters({
        ...queryParameters,
        variables: value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Variables</h3>
        <TextField
          value={queryParameters.variables}
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
