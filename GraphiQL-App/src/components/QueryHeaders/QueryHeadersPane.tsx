import TextField from '@mui/material/TextField';

import { setQueryParameters } from '../../store/slices/queryParametersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import styles from './QueryHeadersPane.module.css';

export function QueryHeadersPane() {
  const dispatch = useAppDispatch();
  const queryParameters = useAppSelector((state) => state.queryParameters);

  const handleRequestFieldChange = (value: string) => {
    dispatch(
      setQueryParameters({
        ...queryParameters,
        headers: value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Headers</h3>
        <TextField
          value={queryParameters.headers}
          label="Headers"
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
