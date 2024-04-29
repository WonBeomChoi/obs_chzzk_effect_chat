import React, { useEffect } from 'react';
import { ChannelData } from '../types/chatProps.type';
import useChat from '../hooks/useChat';
import styled from 'styled-components';
import InteractionLayout from './InteractionLayout/InteractionLayout';
import useSaveLayoutConfig from '../hooks/useSaveLayoutConfig';

const ChatLayout = (props: { chatList: { messages: any[] } }) => {
  const { chatList } = props;

  return (
    <InteractionLayout type="chat" saveCallback={useSaveLayoutConfig}>
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
  // 닉네임 줄바꿈 방지
  white-space: nowrap;
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
