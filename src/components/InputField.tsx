import { ChangeEvent } from 'react';

type InputFieldProps = {
  name: string;
  title: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

function InputField({
  name,
  title,
  value,
  onChange,
  type = 'text',
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={name}>{title}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}

export default InputField;
