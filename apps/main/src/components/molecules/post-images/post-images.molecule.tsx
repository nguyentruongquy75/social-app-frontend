import {
  Backdrop,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import Slider from 'react-slick';
import { MUI_COLUMN, MUI_DEFAULT_ONE_UNIT } from 'apps/main/src/constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDisplay } from 'apps/main/src/hooks';

type Props = {
  countFrom?: number;
  images: string[];
};

const GRID_SPACING = 0.3;

const sliderSetting = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function PostImagesMolecule({ countFrom = 5, images = [] }: Props) {
  const { isDisplay, open, close } = useDisplay();

  const imageCount = images.length;

  const displaySchema: {
    url: string;
    overlay?: boolean;
    content?: string | number;
    span: number;
  }[] = images.slice(0, countFrom).map((image, index) => ({
    url: image,
    overlay:
      image === images.slice(0, countFrom).pop() && imageCount > countFrom,
    content: imageCount - countFrom,
    span:
      index < 2
        ? MUI_COLUMN / (imageCount >= 2 ? 2 : 1)
        : MUI_COLUMN /
          (imageCount > countFrom ? countFrom - 2 : imageCount - 2),
  }));

  return (
    <>
      <Grid container spacing={GRID_SPACING}>
        {displaySchema.map((item) => (
          <Grid
            item
            key={item.url}
            xs={item.span}
            className="image-item-container"
            onClick={open}
          >
            <Box component="img" src={item.url} className="image" />
            {item.overlay && (
              <Typography className="image-item-overlay">
                +{item.content}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDisplay}
        onClose={close}
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            overflow: 'hidden',
            px: 3,
            boxShadow: 'none',
          },
        }}
      >
        <Slider {...sliderSetting}>
          {images.map((item) => (
            <Box
              key={item}
              component="img"
              src={item}
              sx={{
                height: {
                  xs: '60vh',
                  md: '70vh',
                },
              }}
            />
          ))}
        </Slider>
      </Dialog>

      <style jsx global>
        {`
          .image-item-container {
            position: relative;
          }

          .image-item-overlay {
            position: absolute;
            inset: ${GRID_SPACING * MUI_DEFAULT_ONE_UNIT}px;
            display: flex;
            justify-content: center;
            align-items: center;

            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 40px;
            font-weight: 500;
            cursor: pointer;
          }

          .image {
            width: 100%;
            min-height: 200px;
            object-fit: cover;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
