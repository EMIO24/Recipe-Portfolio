
export default function CheckboxList({ options, selectedOptions, onChange }) {
  return (
    <div className="checkbox-list">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
