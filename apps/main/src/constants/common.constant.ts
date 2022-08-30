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
export const USER_STATUS = [
  {
    value: 'Single',
    label: 'Độc thân',
  },
  {
    value: 'In Relationship',
    label: 'Hẹn hò',
  },
  { value: 'Engaged', label: 'Đã đính hôn' },
  {
    value: 'Married',
    label: 'Đã kết hôn',
  },
  {
    value: 'Registered cohabitation',
    label: 'Chung sống có đăng ký',
  },
  {
    value: 'Cohabitation',
    label: 'Chung sống',
  },
  {
    value: 'Find out',
    label: 'Tìm hiểu',
  },
];
export const RECOIL_KEY = 'ishare-key';

export const POST_DIALOG_TYPE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

export const NOTIFICATION_TYPE = {
  REACTION: 'Reaction',
  COMMENT: 'Comment',
};

export const CHATROOM_TYPE = {
  GROUP: 'Group',
  DEFAULT: 'Default',
};
