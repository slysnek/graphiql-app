import { TextField } from '@mui/material';
import styles from './ResponsePanelView.module.css';

interface ResponsePanelViewProps {
  error: boolean;
  error_name?: string;
  error_message?: string;
  result?: string;
}

export const ResponsePanelView = (props: ResponsePanelViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3
          style={{
            margin: '1rem',
          }}
        >
          Response
        </h3>
        <div>
          <span
            style={{
              backgroundColor: props.error ? 'red' : 'green',
              color: 'white',
              fontSize: '20px',
              marginLeft: '1rem',
            }}
          >
            {props.error ? props.error_message : props.result ? 'Success' : ''}
          </span>
        </div>
        <TextField
          value={props.result}
          id="standard-basic"
          variant="outlined"
          multiline
          fullWidth
          disabled
          sx={{
            '& fieldset': { border: 'none' },
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
          inputProps={{
            style: { fontSize: 20 },
          }}
        />
      </div>
    </div>
  );
};
