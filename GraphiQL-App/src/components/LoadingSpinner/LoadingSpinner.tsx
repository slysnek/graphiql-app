import RingLoader from 'react-spinners/RingLoader';

import './LoadingSpinner.css';
import { LoadingSpinnerProps } from '../../types/interfaces';

function LoadingSpinner(props: LoadingSpinnerProps) {
  const isLoading = props.loading;

  return (
    <div className="loader__overlay">
      <div className="loader__box">
        <RingLoader size={100} color={'#343b7f'} loading={isLoading} />
      </div>
    </div>
  );
}

export default LoadingSpinner;
