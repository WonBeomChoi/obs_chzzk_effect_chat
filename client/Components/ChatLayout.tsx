import React from 'react';
import {ChannelData} from '../types/chatProps.type';
import useChat from "../hooks/useChat";
import styled from  'styled-components';

const ChatLayout = (props:{channelData:ChannelData, effect:boolean}) => {
    const chatList = useChat(props);

    return (
        <>
            <Container>
                {chatList.messages.map((msg:any)=>{
                    return <div key={msg.chatId}>
                        <Nickname>{msg.nickname}</Nickname>
                        <span>{msg.msg}</span>
                        </div>
                })}
            </Container>
            {props.effect||<Effect/>}
        </>
    );
};

// 좌측하단에 효과 이미지를 띄워주는 span
const Effect = styled.span`
    width: 20rem;
    height: 20rem;
    position: absolute;
    bottom: 0;
    right: 0;
    background-image: url("http://localhost:3000/effects/이지툰.gif");
    background-repeat: no-repeat;
    background-size: contain;
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