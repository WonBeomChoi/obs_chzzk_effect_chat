export const DEFAULT_CONFIG = {
  chat: {
    x: 0,
    y: 0,
    width: 300,
    height: 500,
  },
  effect: {
    x: 500,
    y: 0,
    width: 300,
    height: 300,
  },
  onSetting: true,
};

export const EFFECTS = [
  {
    eventName: '차태경',
    keywords: ['차태경', '유저'],
    url: 'http://localhost:3000/effects/이지툰.gif',
    runningTime: 2000,
  },
  {
    eventName: '사출',
    keywords: ['사출', '이벤트'],
    url: 'http://localhost:3000/effects/사출.gif',
    runningTime: 3000,
  },
];
