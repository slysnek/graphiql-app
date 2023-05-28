import {
  FieldsEntity,
  ArgsEntity,
  DisplayBoxProps,
  TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity1,
} from '../../types/interfaces';
import './DisplayBox.css';

export default function DisplayBox(props: DisplayBoxProps) {
  type ObjectKey = keyof typeof props.currentEntity;
  type ObjectNodeKey = keyof typeof props.currentEntity;

  return (
    <div className="display-box">
      <h4>{props.header}</h4>
      <hr className="line" />
      <ul className="list">
        {/* checks if object is not undefined, has required properties, these properties is not null and their length is not 0  */}
        {props.displayType === 'implementations' ? (
          (
            props.currentEntity![
              'possibleTypes' as ObjectNodeKey
            ] as TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity1[]
          ).map((el, index: number) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props.addToHistory(props.allFields!.find((ele) => el.name === ele.name)!);
                }}
              >
                <b>{el.name}</b>
              </li>
            );
          })
        ) : props.currentEntity !== undefined &&
          Object.hasOwn(props.currentEntity, props.displayType) &&
          props.currentEntity[props.displayType as keyof typeof props.currentEntity] !== null &&
          props.currentEntity[props.displayType as keyof typeof props.currentEntity]!.length !==
            0 ? (
          //checks if property is array then map if not then display just the value
          Array.isArray(props.currentEntity[props.displayType as ObjectKey]) ? (
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
            <p>{props.currentEntity[props.displayType as ObjectKey]}</p>
          )
        ) : (
          <span>
            {props.noValue} for <b>{props.currentEntity?.name}</b>
          </span>
        )}
      </ul>
    </div>
  );
}
