import { InputBase } from '@mui/material';
import { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  placeholder?: string;
  sx?: any;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export function InputAtom({
  placeholder,
  sx,
  onClick,
  onChange,
  value,
  onKeyUp,
}: Props) {
  return (
    <>
      <InputBase
        placeholder={placeholder}
        className="input"
        fullWidth
        sx={sx}
        onClick={onClick}
        onChange={onChange}
        value={value}
        onKeyUp={onKeyUp}
      />

      <style jsx global>
        {`
          .input {
            background-color: #f0f2f5;
            padding: 2px 12px;
            border-radius: 18px;
          }
        `}
      </style>
    </>
  );
}
