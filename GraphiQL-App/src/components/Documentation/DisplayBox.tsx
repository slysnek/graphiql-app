import { FieldsEntity, ArgsEntity, DisplayBoxProps } from '../../types/interfaces';
import './DisplayBox.css';

export default function DisplayBox(props: DisplayBoxProps) {
  type ObjectKey = keyof typeof props.currentEntity;

  return (
    <div className="display-box">
      <h4>{props.header}</h4>
      <hr className="line" />
      <ul className="list">
        {props.currentEntity !== undefined &&
        Object.hasOwn(props.currentEntity, props.displayType) &&
        props.currentEntity[props.displayType as keyof typeof props.currentEntity] !== null &&
        props.currentEntity[props.displayType as keyof typeof props.currentEntity]!.length !== 0 ? (
          (
            props.currentEntity[props.displayType as ObjectKey] as ArgsEntity[] | FieldsEntity[]
          ).map((el: ArgsEntity | FieldsEntity, index: number) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props.addToHistory(el);
                }}
              >
                {el.name}:{' '}
                {<span>{el.type.name === null ? el.type.ofType!.name : el.type.name}</span>}
              </li>
            );
          })
        ) : (
          <span>
            {props.noValue} for <b>{props.currentEntity?.name}</b>
          </span>
        )}
      </ul>
    </div>
  );
}
