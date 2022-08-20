import Like from 'apps/main/src/assets/images/like.png';
import Love from 'apps/main/src/assets/images/love.png';
import Haha from 'apps/main/src/assets/images/haha.png';
import Wow from 'apps/main/src/assets/images/wow.png';
import Sad from 'apps/main/src/assets/images/sad.png';
import Angry from 'apps/main/src/assets/images/angry.png';

export const REACTIONS = [
  {
    label: 'Thích',
    icon: Like,
    type: 'Like',
  },
  {
    label: 'Yêu thích',
    icon: Love,
    type: 'Love',
  },
  {
    label: 'Haha',
    icon: Haha,
    type: 'Haha',
  },
  {
    label: 'Wow',
    icon: Wow,
    type: 'Wow',
  },
  {
    label: 'Buồn',
    icon: Sad,
    type: 'Sad',
  },
  {
    label: 'Phẩn nộ',
    icon: Angry,
    type: 'Angry',
  },
];

export const DEFAULT_IMAGE_SIZE = 28;
export const DEFAULT_IMAGE_DECORATOR_SIZE = 16;
export const DEFAULT_SUBTITLE_FONT_SIZE = 13;
export const MUI_COLUMN = 12;
export const MUI_DEFAULT_ONE_UNIT = 8;
export const HEADER_HEIGHT = 56;