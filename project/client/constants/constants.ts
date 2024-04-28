export const DEFAULT_CONFIG = {
  chat: {
    x: 0,
    y: 0,
    width: 300,
    height: 500,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
  },
  effect: {
    x: 500,
    y: 0,
    width: 300,
    height: 300,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
  },
};

export const EFFECTS = [
  { keyword: '차태경', url: '이지툰', runningTime: 2000 },
  { keyword: '사출', url: '사출', runningTime: 3000 },
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
