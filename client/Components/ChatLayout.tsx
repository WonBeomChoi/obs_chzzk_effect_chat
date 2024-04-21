import React, { useEffect } from "react";
import { ChannelData } from "../types/chatProps.type";
import useChat from "../hooks/useChat";
import styled from "styled-components";

const ChatLayout = (props: { chatList: { messages: any[] } }) => {
  const { chatList } = props;
  return (
    <>
      <Container>
        {chatList.messages.map((msg: any) => {
          return (
            <div key={msg.chatId}>
              <Nickname>{msg.nickname}</Nickname>
              <span>{msg.msg}</span>
            </div>
          );
        })}
      </Container>
    </>
  );
};

const Effect = styled.span<{ effect: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  background-image: url(${(props) => props.effect});
  opacity: 0.6;

  background-size: 100% 100%;
`;

const Nickname = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #ff6b6b;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 1.5rem;
  color: white;
  width: 600px;
  height: 800px;
`;

export default ChatLayout;
