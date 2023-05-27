interface QueryHistoryProps {
  currentHistory: string[];
  historyReturn: () => void;
}

export default function QueryHistory(props: QueryHistoryProps) {
  return (
    <div>
      <span onClick={props.historyReturn}>{`<`}</span>
      {props.currentHistory?.map((el, index) => {
        return <span key={index}>{el} - </span>;
      })}
    </div>
  );
}
