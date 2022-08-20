import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { ButtonAtom } from '../../atoms/button/buttom.atom';
import { CommonItemAtom } from '../../atoms/common-item/common-item.atom';

export enum FriendInvitationType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

type Props = {
  type: FriendInvitationType;
};

export function FriendInvitationMolecule({ type }: Props) {
  let card;

  if (type === FriendInvitationType.VERTICAL)
    card = (
      <Card>
        <CardMedia
          component="img"
          src={
            'https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-1/287063600_176445761432468_7193977483603521073_n.jpg?stp=dst-jpg_p240x240&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=uGNbgtrhWBcAX_Gl1AF&_nc_ht=scontent.fsgn5-2.fna&oh=00_AT9Xvwh3SSsOuJPlLXDwfMFFa-dMLgxh-EyXml0zlihqfg&oe=6305443C'
          }
          style={{
            aspectRatio: '1',
          }}
        />

        <CardContent>
          <Typography className="invitation__name">Phước Hiếu</Typography>

          <Stack gap={1}>
            <ButtonAtom fullWidth className="invitation__accept-button">
              Xác nhận
            </ButtonAtom>
            <ButtonAtom fullWidth>Huỷ</ButtonAtom>
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
                Huỳnh Thiên An
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
