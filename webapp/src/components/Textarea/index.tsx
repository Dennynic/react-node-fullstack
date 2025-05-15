export const TextArea = ({
  name,
  state,
  setState,
}: {
  name: string;
  state: Record<string, any>;
  setState: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="text">Text</label>
      <br />
      <textarea
        onChange={e => {
          setState({ ...state, text: e.target.value });
        }}
        value={state.text}
        name={name}
        id="text"
      />
    </div>
  );
};
