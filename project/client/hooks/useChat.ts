import { useState, useEffect, useCallback } from 'react';
import { ChannelData } from '../types/chatProps.type';
import { EFFECTS } from '../constants/constants';

interface Message {
  chatId: string;
  emojis: Record<string, string>;
  msg: string;
  nickname: string;
}

const useChat = (props: { channelData: ChannelData }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { channelData } = props;

  const messageParser = useCallback((messageList: any): Message[] => {
    return messageList.map((message: any) => {
      const { msg, extras, profile, uid, utime } = message;

      EFFECTS.map(({ keywords, eventName }) => {
        if (keywords.some((keyword) => msg.includes(keyword))) {
          const event: CustomEvent = new CustomEvent(eventName);
          window.dispatchEvent(event);
        }
      });
      const emojis = JSON.parse(extras).emojis;
      const { nickname } = JSON.parse(profile);

      return {
        nickname: nickname,
        msg: msg,
        emojis: emojis,
        chatId: uid + utime,
      };
    });
  }, []);

  useEffect(() => {
    const ws = new WebSocket('wss://kr-ss1.chat.naver.com/chat');
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          ver: '2',
          cmd: 100,
          svcid: 'game',
          cid: channelData.channelId,
          bdy: {
            uid: channelData.uid,
            devType: 2001,
            accTkn: channelData.accessToken,
            auth: 'READ',
          },
          tid: '1',
        }),
      );
    };

    let sendPing = setTimeout(() => {
      ws.send(
        JSON.stringify({
          ver: 2,
          cmd: 0,
        }),
      );
    }, 10000);
    ws.onmessage = (message) => {
      const msg = JSON.parse(message.data);

      clearTimeout(sendPing);
      sendPing = setTimeout(() => {
        ws.send(
          JSON.stringify({
            ver: 2,
            cmd: 0,
          }),
        );
      }, 10000);

      switch (msg.cmd) {
        case 0: //ping
          ws.send(
            JSON.stringify({
              ver: 2,
              cmd: 10000,
            }),
          );
          break;
        case 10100: //연결된거 확인
          ws.send(
            JSON.stringify({
              sid: msg.bdy.sid,
              cid: channelData.channelId,
              svcid: msg.svcid,
              ver: '2',
              cmd: 5101,
              bdy: {
                recentMessageCount: 50,
              },
              tid: +msg.tid + 1,
            }),
          );
          break;
        // case문에 or 연산 추가는?
        case 93101: //채팅메시지 수신
          setMessages((prevMessages: any) => {
            const messages = [...prevMessages, ...messageParser(msg.bdy)];

            if (messages.length > 20) {
              return messages.slice(messages.length - 20);
            }
            return messages;
          });
          break;
        case 93102: //도네이션 수신
          setMessages((prevMessages: any) => {
            const messages = [...prevMessages, ...messageParser(msg.bdy)];

            if (messages.length > 20) {
              return messages.slice(messages.length - 20);
            }
            return messages;
          });
          break;
        default:
          break;
      }
    };
    ws.onclose = () => {};
  }, []);
  return {
    messages,
  };
};

export default useChat;
