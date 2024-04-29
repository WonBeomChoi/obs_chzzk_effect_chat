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
  { eventName: '차태경', url: 'http://localhost:3000/effects/이지툰.gif', runningTime: 2000 },
  { eventName: '사출', url: 'http://localhost:3000/effects/사출.gif', runningTime: 3000 },
];

export const TRIGGERS = [
  {
    keyword: '차태경',
    eventName: '차태경',
  },
  {
    keyword: '유저',
    eventName: '차태경',
  },
  {
    keyword: '사출',
    eventName: '사출',
  },
  {
    keyword: '이벤트',
    eventName: '사출',
  },
];
