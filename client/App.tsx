import React, { useEffect, useState } from 'react';
import ChatLayout from './Components/ChatLayout';
import { ChannelData } from './types/chatProps.type';

function App(props:ChannelData) {
    const [effect,setEffect] = useState(true);
    useEffect(() => {
        window.addEventListener('차태경', () => {
            if(effect){
                setEffect(false);
                setTimeout(()=>{
                    setEffect(true);
                },2000);
            }
        })
    }, []);
    return <ChatLayout channelData={props} effect={effect}/>;
}

export default App;