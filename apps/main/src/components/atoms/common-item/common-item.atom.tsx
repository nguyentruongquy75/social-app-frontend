import { Box, Stack, Typography } from '@mui/material';
import {
  DEFAULT_IMAGE_DECORATOR_SIZE,
  DEFAULT_IMAGE_SIZE,
  DEFAULT_SUBTITLE_FONT_SIZE,
} from 'apps/main/src/constants';
import { isValidElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  image?: string;
  title?: string;
  styleImage?: any;
  styleTypograpy?: any;
  link?: string;
  roundedImage?: boolean;
  imageSize?: number;
  subtitle?: string;
  imageDecorator?: string | JSX.Element;
  imageDecoratorSize?: number;
  hoverUnderline?: boolean;
  end?: JSX.Element;
  main?: JSX.Element;
  className?: string;
  dot?: boolean;
  imageLink?: string;
  titleLink?: string;
};

export function CommonItemAtom({
  image,
  title,
  styleImage = {},
  styleTypograpy = {},
  link,
  roundedImage,
  imageSize,
  subtitle,
  imageDecorator,
  imageDecoratorSize = DEFAULT_IMAGE_DECORATOR_SIZE,
  hoverUnderline = false,
  end,
  main,
  className,
  dot,
  imageLink,
  titleLink,
}: Props) {
  const navigate = useNavigate();
  const imageStyle: any = {
    width: imageSize ?? DEFAULT_IMAGE_SIZE,
    height: imageSize ?? DEFAULT_IMAGE_SIZE,
    ...styleImage,
  };

  if (roundedImage) imageStyle.borderRadius = '50%';

  const imageNavigate = () => imageLink && navigate(imageLink);

  return (
    <>
      <Stack
        direction="row"
        gap={1.5}
        component={Link}
        to={link ? link : '#'}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        alignItems="center"
        className={className}
      >
        <Box className="common-item-image-container">
          <Box
            component="img"
            src={image}
            sx={imageStyle}
            onClick={imageNavigate}
          />
          {typeof imageDecorator == 'string' && (
            <Box
              component="img"
              src={imageDecorator}
              className="common-item-image-decorator"
              sx={{ width: imageDecoratorSize, height: imageDecoratorSize }}
            />
          )}
          {isValidElement(imageDecorator) && (
            <Box
              className="common-item-image-decorator"
              sx={{ width: imageDecoratorSize, height: imageDecoratorSize }}
            >
              {imageDecorator}
            </Box>
          )}
        </Box>
        {!main && (
          <Stack>
            <Typography
              component={Link}
              variant="subtitle1"
              className={hoverUnderline ? 'hover-underline' : ''}
              sx={{ fontWeight: 500, lineHeight: 1.1, ...styleTypograpy }}
              to={titleLink ? titleLink : '#'}
            >
              {title}
            </Typography>
            <Typography
              fontSize={DEFAULT_SUBTITLE_FONT_SIZE}
              color="text.secondary"
              className={hoverUnderline ? 'hover-underline' : ''}
            >
              {subtitle}
            </Typography>
          </Stack>
        )}

        {main}

        {dot && <Box className="dot" />}

        {end && <Box ml="auto">{end}</Box>}
      </Stack>

      <style jsx global>
        {`
          .hover-underline:hover {
            text-decoration: underline;
          }

          .common-item-image-container {
            position: relative;
          }

          .common-item-image-decorator {
            position: absolute;
            top: 75%;
            right: 0;
            transform: translate(0, -50%);
          }

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #1876f2;
            margin-left: auto;
            flex-shrink: 0;
          }
        `}
      </style>
    </>
  );
}
