import { useState, useEffect, useCallback } from "react";
import { ChannelData } from "../types/chatProps.type";

const useChat = (props: { channelData: ChannelData }) => {
  const [messages, setMessages] = useState<any>([]);

  const messageParser = useCallback((message: any) => {
    return message.map((msg: any) => {
      console.log(msg);
      if (msg.msg.includes("차태경")) {
        const event: CustomEvent = new CustomEvent("차태경");
        window.dispatchEvent(event);
      }
      if (msg.msg.includes("유저")) {
        const event: CustomEvent = new CustomEvent("차태경");
        window.dispatchEvent(event);
      }
      if (msg.msg.includes("사출")) {
        const event: CustomEvent = new CustomEvent("사출");
        window.dispatchEvent(event);
      }
      if (msg.msg.includes("이벤트")) {
        const event = new CustomEvent("사출");
        window.dispatchEvent(event);
      }
      const emojis = JSON.parse(msg.extras).emojis;
      const profile = JSON.parse(msg.profile);
      return {
        nickname: profile.nickname,
        msg: msg.msg,
        emojis: emojis,
        chatId: msg.uid + msg.utime,
      };
    });
  }, []);
  useEffect(() => {
    const ws = new WebSocket("wss://kr-ss1.chat.naver.com/chat");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          ver: "2",
          cmd: 100,
          svcid: "game",
          cid: props.channelData.channelId,
          bdy: {
            uid: props.channelData.uid,
            devType: 2001,
            accTkn: props.channelData.accessToken,
            auth: "READ",
          },
          tid: "1",
        })
      );
    };

    let sendPing = setTimeout(() => {
      ws.send(
        JSON.stringify({
          ver: 2,
          cmd: 0,
        })
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
          })
        );
      }, 10000);

      switch (msg.cmd) {
        case 0: //ping
          ws.send(
            JSON.stringify({
              ver: 2,
              cmd: 10000,
            })
          );
          break;
        case 10100: //연결된거 확인
          ws.send(
            JSON.stringify({
              sid: msg.bdy.sid,
              cid: props.channelData.channelId,
              svcid: msg.svcid,
              ver: "2",
              cmd: 5101,
              bdy: {
                recentMessageCount: 50,
              },
              tid: +msg.tid + 1,
            })
          );
          break;
        case 93101: //채팅메시지 수신
          setMessages((prevMessages: any[]) => {
            const messages = [...prevMessages, ...messageParser(msg.bdy)];
            if (messages.length > 20) {
              return messages.slice(messages.length - 20);
            }
            return messages;
          });
          break;
        case 93102: //도네이션 수신
          setMessages((prevMessages: any[]) => {
            const messages = [...prevMessages, ...messageParser(msg.bdy)];
            if (messages.length > 20) {
              return messages.slice(messages.length - 20);
            }
            return messages;
          });
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
