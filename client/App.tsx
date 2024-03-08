import React, { useState } from 'react';
import ChatLayout from './Components/ChatLayout';
import { ChannelData } from './types/chatProps.type';

function App(props:ChannelData) {
    return <ChatLayout channelData={props}/>;
}

export default App;