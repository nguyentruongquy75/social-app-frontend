export const BASE_API = process.env['NX_API'];

export const AUTH_ENPOINT = {
  BASE: 'auth',
  LOGIN: '/signin',
  SIGNUP: '/signup',
  ME: '/me',
};

export const USER_ENDPOINT = {
  BASE: 'users',
  NOTIFICATION: '/notifications',
  NEWSFEED: '/newsfeed',
  FRIENDS: '/friends',
  CONTACTS: '/contacts',
  SEARCH: '/search',
};

export const CHAT_ENDPOINT = {
  BASE: 'chat',
  MESSAGE: '/message',
  SEEN: '/seen',
};

export const NOTIFICATION_ENDPOINT = {
  BASE: 'notification',
  GET: 'users/notifications',
  READ: '/read',
};

export const POST_ENDPOINT = {
  BASE: 'post',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
};

export const REACTION_ENDPOINT = {
  BASE: 'reaction',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
};

export const COMMENT_ENDPOINT = {
  BASE: 'comment',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
};

export const INVITATION_ENDPOINT = {
  BASE: 'invitations',
  ACCEPT: '/accept',
  DECLINE: '/decline',
};
