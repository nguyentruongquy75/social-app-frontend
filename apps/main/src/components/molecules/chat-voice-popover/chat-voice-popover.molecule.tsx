import { Call, CallEnd } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Peer } from 'peerjs';
import { fetcher } from 'apps/main/src/api/fetcher';

import Avatar from 'apps/main/src/assets/images/large-avatar.png';
import { CHAT_ENDPOINT, EVENTS } from 'apps/main/src/constants';
import { useAudio, useSocket } from 'apps/main/src/hooks';
import { userState } from 'apps/main/src/stores';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { RoomTypes } from '../chat-popover/chat-popover.molecule';

export enum CallStatus {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  STOPED = 'stoped',
}

type Props = {
  type: RoomTypes;
  roomId: number;
  userCall?: number;
};

export function ChatVoiceMolecule({ type, roomId, userCall }: Props) {
  const socket = useSocket();
  const [user] = useRecoilState(userState);
  const { data: room } = useSWR(
    CHAT_ENDPOINT.BASE + `/${roomId}`,
    (url) => fetcher(url),
    {
      refreshInterval: 0,
    }
  );

  const [status, setStatus] = useState(CallStatus.WAITING);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const participant = room?.users.find((u: any) => u.userId !== user.id)?.user;

  const isCaller = userCall === user.id;

  const handUp = () => {
    socket.emit(EVENTS.UPDATE_ROOM_CALL_RTC, {
      roomId,
      type,
      status: CallStatus.PROCESSING,
    });
  };

  const handDown = () => {
    socket.emit(EVENTS.UPDATE_ROOM_CALL_RTC, {
      roomId,
      type,
      status: CallStatus.STOPED,
    });
  };

  useEffect(() => {
    if (isCaller)
      socket.emit(type, {
        userId: user.id,
        roomId: roomId,
        type: type,
        status: CallStatus.WAITING,
      });

    socket.on(roomId + type, (data) => {
      switch (data?.status) {
        case CallStatus.PROCESSING:
          setStatus(CallStatus.PROCESSING);
          break;

        case CallStatus.STOPED:
          setStatus(CallStatus.STOPED);
          break;

        default:
          break;
      }
    });

    return () => {
      socket.off(roomId + type);
    };
  }, []);

  useEffect(() => {
    const getUserStream = async () => {
      return navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: type === RoomTypes.VIDEO_CALL,
        })
        .then((stream) => {
          setLocalStream(stream);
          return stream;
        });
    };

    const call = async (peer: Peer) => {
      const stream = await getUserStream();
      const call = peer.call(participant.id + roomId + type, stream);

      call.on('stream', (remoteStream: any) => setRemoteStream(remoteStream));
    };

    const answer = async (peer: Peer) => {
      peer.on('call', async (call) => {
        const stream = await getUserStream();

        call.answer(stream);

        call.on('stream', (remoteStream) => setRemoteStream(remoteStream));
      });
    };

    if (status === CallStatus.PROCESSING) {
      const peer = new Peer(user.id + roomId + type);
      setPeer(peer);

      if (isCaller) call(peer);
      else answer(peer);
    }

    if (status === CallStatus.STOPED) {
      peer?.destroy();
      setPeer(null);
      setLocalStream(null);
      setRemoteStream(null);

      setTimeout(() => {
        PubSub.publish(EVENTS.REMOVE_ROOM, {
          id: roomId,
          type,
        });
      }, 3000);
    }
  }, [status]);

  useEffect(() => {
    if (type === RoomTypes.VOICE_CHAT) {
      audioRef.current && (audioRef.current.srcObject = remoteStream);
    }

    if (type === RoomTypes.VIDEO_CALL) {
      remoteVideoRef.current &&
        (remoteVideoRef.current.srcObject = remoteStream);
    }
  }, [remoteStream]);

  useEffect(() => {
    if (type === RoomTypes.VIDEO_CALL) {
      localVideoRef.current && (localVideoRef.current.srcObject = localStream);
    }
  }, [localStream]);

  return (
    <>
      <Box className="chatroom-container">
        <audio hidden ref={audioRef} autoPlay />

        {status === CallStatus.PROCESSING && (
          <Box className="local-video">
            <video ref={localVideoRef} autoPlay muted />
          </Box>
        )}

        {status === CallStatus.PROCESSING && (
          <Box className="remote-video">
            <video ref={remoteVideoRef} autoPlay />
          </Box>
        )}

        <Box textAlign="center">
          <Box
            component="img"
            src={participant?.avatarImage ?? Avatar}
            className="call-avatar"
          />
          <Typography className="call-user">{participant?.fullName}</Typography>
          {status === CallStatus.WAITING && (
            <Typography className="call-desc">
              {isCaller ? 'Đang gọi' : 'Đang gọi cho bạn'}
            </Typography>
          )}

          {status === CallStatus.STOPED && (
            <Typography className="call-desc">
              Cuộc trò chuyện đã kết thúc
            </Typography>
          )}
        </Box>
        <Box></Box>

        <Box className="call-action">
          <Stack direction="row" justifyContent="center" gap={10}>
            {status !== CallStatus.STOPED && (
              <IconButton
                className="call-action-button call-action-button--cancel"
                onClick={handDown}
              >
                <CallEnd />
              </IconButton>
            )}

            {!isCaller && status === CallStatus.WAITING && (
              <IconButton
                className="call-action-button call-action-button--accept"
                onClick={handUp}
              >
                <Call />
              </IconButton>
            )}
          </Stack>
        </Box>
      </Box>

      <style jsx global>
        {`
          .chatroom-container {
            position: relative;
            width: 338px;
            background-color: white;
            border-radius: 8px;
            padding: 60px 0 50px;
          }

          .call-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }

          .call-user {
            font-size: 20px;
            font-weight: 500;
          }

          .call-desc {
            font-size: 13px;
          }

          .call-action {
            margin-top: 30%;
          }

          .call-action-button {
            width: 60px;
            height: 60px;
            color: white;
          }

          .call-action-button.call-action-button--accept {
            background: #4ecd23;
          }

          .call-action-button.call-action-button--cancel {
            background: #f03d25;
          }

          .local-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 80px;
            z-index: 1;
          }

          .remote-video {
            position: absolute;
            inset: 0;
            z-index: 0;
          }

          .local-video video,
          .remote-video video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
}
