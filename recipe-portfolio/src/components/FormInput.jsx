
export default function FormInput({ label, type, value, onChange }) {
  return (
    <div className="form-input">
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} />
      </label>
    </div>
  );
}
