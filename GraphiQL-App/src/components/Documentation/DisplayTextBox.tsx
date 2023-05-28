import { DisplayTextBoxProps } from '../../types/interfaces';
import DisplayBox from './DisplayBox';
import './DisplayTextBox.css';

export default function DisplayTextBox(props: DisplayTextBoxProps) {
  return (
    <div className="display-text-box">
      <h4>{props.header}</h4>
      <hr className="line" />
      {props.currentEntity !== undefined &&
      props.currentEntity !== undefined &&
      Object.hasOwn(props.currentEntity, props.displayType) &&
      props.currentEntity[props.displayType as keyof typeof props.currentEntity] !== null &&
      props.displayType === 'description' ? (
        <p>{props.currentEntity[props.displayType]}</p>
      ) : props.currentEntity !== undefined &&
        props.displayType === 'metadata' &&
        Object.hasOwn(props.currentEntity, 'type') &&
        props.currentEntity.type.name !== null ? (
        <div>
          <p>
            Metadata for <b>{props.currentEntity.type.name}</b> Type
          </p>
          <DisplayBox
            header="Fields"
            noValue="No Fields"
            displayType="fields"
            allFields={props.allFields}
            addToHistory={props.addToHistory}
            currentEntity={props.allFields!.find(
              (el) => el.name === props.currentEntity!.type.name
            )}
          ></DisplayBox>
          <DisplayBox
            header="Description"
            noValue="No Description"
            allFields={props.allFields}
            currentEntity={props.allFields!.find(
              (el) => el.name === props.currentEntity!.type.name
            )}
            displayType="description"
            addToHistory={props.addToHistory}
          ></DisplayBox>
          {props.currentEntity.name === 'node' ? (
            <DisplayBox
              header="Implementations"
              noValue="No Implementations"
              allFields={props.allFields}
              currentEntity={props.allFields!.find(
                (el) => el.name.toLowerCase() === props.currentEntity!.name
              )}
              displayType="implementations"
              addToHistory={props.addToHistory}
            ></DisplayBox>
          ) : (
            ''
          )}
        </div>
      ) : props.currentEntity !== undefined &&
        props.displayType === 'metadata' &&
        Object.hasOwn(props.currentEntity, 'type') &&
        props.currentEntity.type.ofType!.name !== null ? (
        <div>
          <p>
            Metadata for <b>{props.currentEntity.type.ofType!.name}</b> Type
          </p>
          <DisplayBox
            header="Fields"
            noValue="No Fields"
            displayType="fields"
            allFields={props.allFields}
            addToHistory={props.addToHistory}
            currentEntity={props.allFields!.find(
              (el) =>
                el.name === props.currentEntity!.type.name ||
                el.name === props.currentEntity!.type.ofType!.name
            )}
          ></DisplayBox>
        </div>
      ) : (
        <span>
          {props.noValue} for <b>{props.currentEntity?.name}</b>
        </span>
      )}
    </div>
  );
}
