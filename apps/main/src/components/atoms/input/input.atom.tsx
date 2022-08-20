import { InputBase } from '@mui/material';

type Props = {
  placeholder?: string;
};

export function InputAtom({ placeholder }: Props) {
  return (
    <>
      <InputBase placeholder={placeholder} className="input" fullWidth />

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
