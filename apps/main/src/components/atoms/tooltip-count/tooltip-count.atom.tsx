import { Box, List, ListItem, Typography } from '@mui/material';

type TooltipComponentProp = {
  title?: string;
  url?: string;
};

export function TooltipCountAtom({ title = '', url }: TooltipComponentProp) {
  return (
    <>
      <Box className="tooltip">
        <Typography fontWeight={500}>{title}</Typography>
        <List>
          <ListItem disablePadding>A</ListItem>
        </List>
      </Box>

      <style jsx global>
        {``}
      </style>
    </>
  );
}
