import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { BASE_API } from '../constants';

let socket: any;

export function useSocket(): Socket<DefaultEventsMap, DefaultEventsMap> {
  if (!socket) socket = io(BASE_API ?? '');

  return socket;
}
