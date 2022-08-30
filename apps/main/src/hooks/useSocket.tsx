import { DefaultEventsMap } from '@socket.io/component-emitter';
import { AnyMxRecord } from 'dns';
import { io, Socket } from 'socket.io-client';
let socket: any;

export function useSocket(): Socket<DefaultEventsMap, DefaultEventsMap> {
  if (!socket) socket = io('http://localhost:80');

  return socket;
}
