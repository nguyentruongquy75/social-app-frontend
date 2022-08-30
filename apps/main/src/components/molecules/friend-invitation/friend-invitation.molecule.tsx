import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { acceptInvitationApi, declineInvitationApi } from 'apps/main/src/api';

import Avatar from 'apps/main/src/assets/images/large-avatar.png';
import { useState } from 'react';
import { ButtonAtom } from '../../atoms/button/buttom.atom';
import { CommonItemAtom } from '../../atoms/common-item/common-item.atom';

export enum FriendInvitationType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

type Props = {
  type: FriendInvitationType;
  sender: any;
  id: number;
};

const INVITATION_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
};

export function FriendInvitationMolecule({ type, sender, id }: Props) {
  let card;

  const [status, setStatus] = useState(INVITATION_STATUS.PENDING);

  const acceptInvitation = async (id: number) => {
    setStatus(INVITATION_STATUS.ACCEPTED);
    await acceptInvitationApi(id);
  };

  const declineInvitation = async (id: number) => {
    setStatus(INVITATION_STATUS.DECLINED);
    await declineInvitationApi(id);
  };

  if (type === FriendInvitationType.VERTICAL)
    card = (
      <Card>
        <CardMedia
          component="img"
          src={sender.avatarImage ?? Avatar}
          style={{
            aspectRatio: '1',
          }}
        />

        <CardContent>
          <Typography className="invitation__name">
            {sender.fullName}
          </Typography>

          <Stack gap={1}>
            {status !== INVITATION_STATUS.DECLINED && (
              <ButtonAtom
                fullWidth
                className="invitation__accept-button"
                disabled={status === INVITATION_STATUS.ACCEPTED}
                onClick={() => acceptInvitation(id)}
              >
                {status === INVITATION_STATUS.ACCEPTED
                  ? 'Đã chấp nhận lời mời kết bạn'
                  : 'Xác nhận'}
              </ButtonAtom>
            )}

            {status !== INVITATION_STATUS.ACCEPTED && (
              <ButtonAtom
                fullWidth
                disabled={status === INVITATION_STATUS.DECLINED}
                onClick={() => declineInvitation(id)}
              >
                {status === INVITATION_STATUS.DECLINED
                  ? 'Đã xoá yêu cầu'
                  : 'Huỷ'}
              </ButtonAtom>
            )}
          </Stack>
        </CardContent>
      </Card>
    );

  if (type === FriendInvitationType.HORIZONTAL)
    card = (
      <CommonItemAtom
        image={Avatar}
        imageSize={60}
        roundedImage
        main={
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" justifyContent="space-between" pb={1}>
              <Typography className="invitation__name">
                {sender.fullName}
              </Typography>
              <Typography className="invitation__time">3 năm</Typography>
            </Stack>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <ButtonAtom fullWidth className="invitation__accept-button">
                  Xác nhận
                </ButtonAtom>
              </Grid>

              <Grid item xs={6}>
                <ButtonAtom fullWidth>Xoá</ButtonAtom>
              </Grid>
            </Grid>
          </Box>
        }
      />
    );

  return (
    <>
      {card}
      <style jsx global>
        {`
          .invitation__name {
            font-size: 17px;
            font-weight: 600;
          }

          .invitation__time {
            font-size: 13px;
          }

          .invitation__accept-button {
            background-color: #1b74e4;
            color: white !important;
          }

          .invitation__accept-button:hover {
            background-color: #1b74e4;
            filter: brightness(0.95);
          }
        `}
      </style>
    </>
  );
}
