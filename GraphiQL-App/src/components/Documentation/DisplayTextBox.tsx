interface DisplayTextBoxProps {
  header: string;
  noValue: string;
  displayType: string;
  localHistoryState: any;
}

export default function DisplayTextBox(props: DisplayTextBoxProps) {
  /*   const historyState = useAppSelector((state) => state.historyState); */

  return (
    <div className="display-text-box">
      <h4>{props.header}</h4>
      <hr />
      <ul>
        {props.localHistoryState !== undefined &&
        Object.hasOwn(props.localHistoryState, props.displayType) &&
        props.localHistoryState[props.displayType] !== null ? (
          <p>{props.localHistoryState[props.displayType]}</p>
        ) : (
          props.noValue
        )}
      </ul>
    </div>
  );
}
