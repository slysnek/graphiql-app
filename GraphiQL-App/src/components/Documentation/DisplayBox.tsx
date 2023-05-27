interface DisplayBoxProps {
  header: string;
  noValue: string;
  displayType: string;
  localHistoryState: any;
  addToHistory: (element: any)=>void;
}

export default function DisplayBox(props: DisplayBoxProps) {
/*   const historyState = useAppSelector((state) => state.historyState); */

  return (
    <div className="display-box">
      <h4>{props.header}</h4>
      <hr />
      <ul>
        {props.localHistoryState !== undefined &&
        Object.hasOwn(props.localHistoryState, props.displayType)
          ? props.localHistoryState[props.displayType]?.map((el, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <li
                  key={index}
                  onClick={() => {
                    props.addToHistory(el);
                  }}
                >
                  {el.name}: {<span>{el.type.name}</span>}
                </li>
              );
            })
          : props.noValue}
      </ul>
    </div>
  );
}
