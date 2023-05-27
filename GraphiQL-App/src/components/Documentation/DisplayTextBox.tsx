import DisplayBox from './DisplayBox';

interface DisplayTextBoxProps {
  header: string;
  noValue: string;
  displayType: string;
  localHistoryState: any;
  allFields: any;
  addToHistory: (element: any) => void;
}

export default function DisplayTextBox(props: DisplayTextBoxProps) {
  return (
    <div className="display-text-box">
      <h4>{props.header}</h4>
      <hr />
      {/* description */}

      {props.localHistoryState !== undefined &&
      Object.hasOwn(props.localHistoryState, props.displayType) &&
      props.localHistoryState[props.displayType] !== null &&
      props.displayType === 'description' ? (
        <p>{props.localHistoryState[props.displayType]}</p>
      ) : props.localHistoryState !== undefined &&
        props.displayType === 'metadata' &&
        Object.hasOwn(props.localHistoryState, 'type') ? (
        <div>
          <p>Metadata for {props.localHistoryState.type.name}</p>
          <DisplayBox
            header="Fields"
            noValue="No Fields"
            displayType="fields"
            addToHistory={props.addToHistory}
            localHistoryState={props.allFields.find(
              (el) => el.name === props.localHistoryState.type.name
            )}
          ></DisplayBox>
        </div>
      ) : (
        props.noValue
      )}
    </div>
  );
}
