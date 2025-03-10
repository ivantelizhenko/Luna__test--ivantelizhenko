import { ChangeEvent } from 'react';

type SelectFieldProps = {
  name: string;
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

function SelectField({
  name,
  title,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <>
      <label htmlFor={name}>{title}:</label>
      <select id={name} name={name} value={value} onChange={onChange} required>
        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectField;
