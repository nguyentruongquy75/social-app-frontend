import { InputBase } from '@mui/material';

type Props = {
  placeholder?: string;
  sx?: any;
  onClick?: () => void;
};

export function InputAtom({ placeholder, sx, onClick }: Props) {
  return (
    <>
      <InputBase
        placeholder={placeholder}
        className="input"
        fullWidth
        sx={sx}
        onClick={onClick}
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
