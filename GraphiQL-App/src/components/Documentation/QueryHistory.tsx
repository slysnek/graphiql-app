import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { QueryHistoryProps } from '../../types/interfaces';
import './QueryHistory.css';

export default function QueryHistory(props: QueryHistoryProps) {
  return (
    <div className="history-wrapper">
      <ArrowBackIcon
        className="back-button"
        color="primary"
        onClick={props.historyReturn}
      ></ArrowBackIcon>
      <div className="history">
        {props.currentHistory.map((el, index) => {
          return (
            <div className="history-element" key={index}>
              <NavigateNextIcon color="secondary"></NavigateNextIcon>
              <b>{el}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}
