import React, { useEffect } from 'react';
import {ChannelData} from '../types/chatProps.type';
const ChatLayout = (props:{channelData:ChannelData}) => {
    return (
        <div>
            <h1>Chat Layout</h1>
            <p>Channel ID: {props.channelData.channelId}</p>
            <p>Access Token: {props.channelData.accessToken}</p>
        </div>
    );
};

export default ChatLayout;