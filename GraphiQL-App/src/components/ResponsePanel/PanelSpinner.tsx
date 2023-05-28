import { CircularProgress } from '@mui/material';

export const PanelSpinner = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress />
    </div>
  );
};
