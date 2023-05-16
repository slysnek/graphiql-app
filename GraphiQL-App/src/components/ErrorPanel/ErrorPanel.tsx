import { TextField } from '@mui/material';
import styles from './ErrorPanel.module.css';
import { red } from '@material-ui/core/colors';

export interface ErrorPanelProps {
  name: string;
  message: string;
  result: string;
}

export const ErrorPanel = (props: ErrorPanelProps) => {
  return (
    <div>
      <h3 style={{ backgroundColor: 'red', color: 'white' }}>
        Error: {props.name + ':' + props.message}
      </h3>
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
  );
};
