import { Box, List, ListItem, Typography } from '@mui/material';
import { fetcher } from 'apps/main/src/api/fetcher';
import { BASE_API } from 'apps/main/src/constants';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type TooltipComponentProp = {
  title?: string;
  url?: string;
};

export function TooltipCountAtom({
  title = '',
  url = '',
}: TooltipComponentProp) {
  const { data } = useSWR(url, (url) => fetcher(url), {
    refreshInterval: 0,
    dedupingInterval: 4000,
  });

  return (
    <>
      <Box className="tooltip">
        <Typography fontWeight={500}>{title}</Typography>
        <List>
          {data?.items.map((item: any) => (
            <ListItem disablePadding>{item.user.fullName}</ListItem>
          ))}
        </List>
      </Box>

      <style jsx global>
        {``}
      </style>
    </>
  );
}
