import { Button } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[] | String;
  onClick?: () => void;
  normalize?: boolean;
  sx?: any;
  fullWidth?: boolean;
  className?: string;
};

export function ButtonAtom({
  children,
  onClick,
  normalize = true,
  sx = {},
  fullWidth,
  className,
}: Props) {
  let classes = 'button ';
  if (normalize) classes = classes.concat('normalize ');
  if (className) classes = classes.concat(className + ' ');

  return (
    <>
      <Button
        sx={sx}
        onClick={onClick}
        className={classes}
        fullWidth={fullWidth}
      >
        {children}
      </Button>

      <style jsx global>{`
        .button {
          padding: 4px 12px;
          background-color: #e4e6eb;
          font-size: 15px;
        }

        .button.normalize {
          color: #050505;
          text-transform: none;
        }

        .button:hover {
          background-color: rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
}
