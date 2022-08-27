import { Box, Popover, Stack, Tooltip } from '@mui/material';
import { REACTIONS } from 'apps/main/src/constants';

type Props = {
  isDisplay: boolean;
  anchorEl: any;
  close: () => void;
  onSetReaction: (type: string) => void;
};

export function ReactionPopoverMolecule({
  isDisplay,
  anchorEl,
  close,
  onSetReaction,
}: Props) {
  const chooseReaction = (type: string) => {
    onSetReaction(type);
    close();
  };

  return (
    <>
      <Popover
        open={isDisplay}
        onClose={close}
        anchorEl={anchorEl}
        PaperProps={{ sx: { borderRadius: '30px' } }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        disableScrollLock
      >
        <Stack direction="row" gap={1} className="reaction-popover">
          {REACTIONS.map((item) => (
            <Tooltip title={item.label} key={item.type}>
              <Box
                component="img"
                src={item.icon}
                key={item.label}
                sx={{ width: 39 }}
                className="reaction-image"
                onClick={() => chooseReaction(item.type)}
              />
            </Tooltip>
          ))}
        </Stack>
      </Popover>

      <style jsx global>
        {`
          .reaction-popover {
            padding: 4px;
          }

          .reaction-image {
            transition: 0.2s ease;
          }

          .reaction-image :hover {
            transform: scale(1.2);
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
