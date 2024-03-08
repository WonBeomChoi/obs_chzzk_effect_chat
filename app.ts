import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';

import {ChannelData} from './client/types/chatProps.type';

import App from './client/App';

const app = express();
// 치지직 채팅연결을 위한 데이터 가져오기함수
const getChannelData = async (id: string): Promise<ChannelData|null> => {
  try {
    const statusInfoRes = await fetch(`https://api.chzzk.naver.com/polling/v2/channels/${id}/live-status`);
    const status = await statusInfoRes.json();
    if (status.code !== 200) {
      return null;
    }
    const channelId = status.content.chatChannelId;
    const accessTokenRes = await fetch(`https://comm-api.game.naver.com/nng_main/v1/chats/access-token?channelId=${channelId}&chatType=STREAMING`)
    const accessTokenData = await accessTokenRes.json();
    const accessToken = accessTokenData.content.accessToken;
    return {
      accessToken,channelId
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
app.use('/chat', express.static(path.join(__dirname, 'dist/client')));

app.get('/chat/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const channelData:ChannelData|null = await getChannelData(id);
    if (!channelData) {
      res.status(404).send('Not Found');
      return;
    }
    const component = React.createElement(App, channelData);
    const appString = renderToString(component);
    const indexHtml = fs.readFileSync('./dist/client/index.html', 'utf8');
    const channelDataAtrribute = `data-channel-id="${channelData.channelId}" data-access-token="${channelData.accessToken}"`;
    const renderedHtml = indexHtml.replace('<div id="root"></div>', `<div id="root" ${channelDataAtrribute}>${appString}</div>`);
    res.send(renderedHtml)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});