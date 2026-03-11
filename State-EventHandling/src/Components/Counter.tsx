
interface Props {
  value: number;
  onIncrease: () => void;
}

const Counter = ({ value, onIncrease }: Props) => {
  return (
    <div>
      <button onClick={onIncrease}>{value}</button>
    </div>
  );
}

export default Counter