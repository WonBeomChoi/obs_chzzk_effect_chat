import React, { useEffect } from "react";
import { ChannelData } from "../types/chatProps.type";
import useChat from "../hooks/useChat";
import styled from "styled-components";
import InteractionLayout from "./InteractionLayout/InteractionLayout";

const ChatLayout = (props: { chatList: { messages: any[] } }) => {
  const { chatList } = props;
  return (
    <InteractionLayout type="chat">
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
    </InteractionLayout>
  );
};

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
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default ChatLayout;
